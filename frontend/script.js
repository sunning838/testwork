// --- 1. 전역 변수 설정 ---
const API_URL = 'http://127.0.0.1:5000/api/download_midi'; 
const PDF_API_URL = 'http://127.0.0.1:5000/api/get_pdf_content'; 
const VIRTUAL_WAIT_SECONDS = 2; 

let isProcessing = false;
let midiBlob = null;
let pdfBlob = null; 
let downloadFilename = ''; 

// --- 2. DOM 요소 설정 ---
const fileInput = document.getElementById('fileInput');
const startButton = document.getElementById('startButton');
const statusMessageElement = document.getElementById('statusMessageElement');
const spinnerContainer = document.getElementById('spinnerContainer');
const inputGroup = document.querySelector('.input-group');
const pdfViewerContainer = document.getElementById('pdfViewerContainer');
const pdfViewer = document.getElementById('pdfViewer');
const resetButton = document.getElementById('resetButton'); 


// --- 3. 상태 메시지 업데이트 헬퍼 함수 ---
function updateStatus(message, type = 'info') {
    statusMessageElement.innerText = message;
    statusMessageElement.className = `status-${type}`;
}

// --- 4. 드래그 앤 드롭 이벤트 핸들러 (유지) ---
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    inputGroup.addEventListener(eventName, preventDefaults, false);
});
['dragenter', 'dragover'].forEach(eventName => {
    inputGroup.addEventListener(eventName, () => inputGroup.classList.add('highlight'), false);
});
['dragleave', 'drop'].forEach(eventName => {
    inputGroup.addEventListener(eventName, () => inputGroup.classList.remove('highlight'), false);
});
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}
inputGroup.addEventListener('drop', handleDrop, false);
function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    fileInput.files = files; 
    handleFileSelect();
}

// --- 5. 파일 선택 변경 감지 리스너 (기존 로직 시작점) ---
fileInput.addEventListener('change', handleFileSelect);

function handleFileSelect() {
    const selectedFile = fileInput.files[0];
    
    if (selectedFile) {
        updateStatus(`파일 '${selectedFile.name}'이 선택되었습니다. 변환 시작을 눌러주세요.`, 'info');
        // 기존 PDF 뷰어 숨김 (초기화)
        pdfViewerContainer.style.display = 'none';
        resetButton.style.display = 'none';
    } else {
        resetUI();
    }
}


// --- 6. 서버 통신 함수 (미디 및 PDF) ---

// 미디 파일 다운로드 요청
function sendForMidiDownload(file) {
    updateStatus(`[1/3] 파일 변환 을 위해 파일을 전송 중...`, 'info'); 
    const formData = new FormData();
    formData.append('file', file);

    return fetch(API_URL, { method: 'POST', body: formData })
        .then(response => {
            if (!response.ok) {
                 return response.json().then(err => { throw new Error(`MIDI 오류: ${err.error || response.status}`); });
            }
            
            const disposition = response.headers.get('Content-Disposition') || response.headers.get('content-disposition');
            const filenameMatch = disposition ? disposition.split('filename=')[1] : null;
            const filename = filenameMatch ? filenameMatch.replace(/\"/g, '') : downloadFilename; 

            return response.blob().then(blob => ({ blob, filename }));
        });
}

// PDF 파일 내용 요청 (출력용)
function fetchPdfForDisplay(file) {
    updateStatus(`[2/3] 악보 파일을 요청 중...`, 'info');
    const formData = new FormData();
    formData.append('file', file); 

    return fetch(PDF_API_URL, { method: 'POST', body: formData })
    .then(response => {
        if (!response.ok) {
            throw new Error(`악보 요청 실패: [HTTP ${response.status}]`);
        }
        return response.blob(); 
    });
}

// --- 7. 완료 후 다운로드 및 출력 실행 (Phase 3) ---
function finalizeActions(midiBlob, pdfBlob, midiFilename) {
    
    // 1. 미디 파일 다운로드 실행
    updateStatus(`✅ 파일 생성 완료! 다운로드를 시작합니다.`, 'success'); 
    
    const midiUrl = window.URL.createObjectURL(midiBlob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = midiUrl;
    a.download = midiFilename; 
    document.body.appendChild(a);
    a.click(); // 미디 파일 다운로드 시작
    window.URL.revokeObjectURL(midiUrl);

    // 2. PDF 화면 출력
    updateStatus(`✅ 파일 생성 완료! 다운로드를 시작합니다.`, 'success');

    const pdfUrl = window.URL.createObjectURL(pdfBlob);
    pdfViewer.src = pdfUrl;
    
    // --- UI 변경 (오른쪽에 뷰어 표시) ---
    pdfViewerContainer.style.display = 'block'; 
    resetButton.style.display = 'block'; 

    // 3. UI 정리 (왼쪽 UI)
    spinnerContainer.style.display = 'none';
    inputGroup.style.display = 'none'; 
    startButton.style.display = 'none';
}


// --- 8. 전체 프로세스 시작 (버튼 클릭 시) ---
function startProcess() {
    if (isProcessing) return;

    const selectedFile = fileInput.files[0];

    if (!selectedFile) {
        alert('파일을 먼저 선택해주세요.');
        return;
    }

    // 파일명 시뮬레이션: 미디 파일명만 예측
    let originalName = selectedFile.name;
    let baseName = originalName.lastIndexOf('.') > 0 ? originalName.substring(0, originalName.lastIndexOf('.')) : originalName;
    downloadFilename = baseName + '.midi'; 

    isProcessing = true;
    startButton.disabled = true;
    startButton.innerText = '전송 중...';
    
    // UI 숨김 및 스피너 표시 (왼쪽 UI)
    inputGroup.style.display = 'none'; 
    startButton.style.display = 'none'; 
    pdfViewerContainer.style.display = 'none'; 
    resetButton.style.display = 'none';
    spinnerContainer.style.display = 'flex';
    
    let currentMidiBlob;
    
    // 1단계: 미디 파일 요청 (메인 다운로드)
    sendForMidiDownload(selectedFile)
        .then(midiResult => {
            currentMidiBlob = midiResult.blob;
            downloadFilename = midiResult.filename; // 서버에서 받은 미디 파일명 확정

            // 2단계: PDF 파일 요청 (출력용)
            return fetchPdfForDisplay(selectedFile); 
        })
        .then(pdfResultBlob => {
            pdfBlob = pdfResultBlob;

            updateStatus(`서버 응답 확인! 최종 처리 중...`, 'info');

            // 3단계: 가상 로딩 시간(5초) 대기 후 최종 동작 실행
            setTimeout(() => {
                finalizeActions(currentMidiBlob, pdfBlob, downloadFilename);
            }, VIRTUAL_WAIT_SECONDS * 1000); 
        })
        .catch(error => {
            console.error('전체 프로세스 중 오류:', error);
            updateStatus(`❌ 처리 실패: ${error.message}`, 'error');
            resetUI();
        });
}

// --- 9. UI 초기화 ---
function resetUI() {
    isProcessing = false;

    startButton.disabled = false;
    startButton.innerText = `변환 시작`;
    startButton.style.display = 'block'; // 버튼 표시

    spinnerContainer.style.display = 'none';
    pdfViewerContainer.style.display = 'none';
    resetButton.style.display = 'none';

    inputGroup.style.display = 'block'; // 입력 필드 표시

    fileInput.value = null; 
    
    // Blob URL 해제
    if (pdfViewer.src) {
        URL.revokeObjectURL(pdfViewer.src);
        pdfViewer.src = '';
    }

    midiBlob = null;
    pdfBlob = null;
    downloadFilename = '';

    updateStatus("파일을 선택하거나 드래그하여 올려주세요.", 'info');
}