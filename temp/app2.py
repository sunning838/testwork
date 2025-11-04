from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from io import BytesIO
import time  # time 모듈 추가

#파일 변환 시험용 임시 프론트엔드

app = Flask(__name__)

# -------------------------------------------------------------
# CORS 설정 수정: Content-Disposition 헤더를 프론트엔드에 노출해야 합니다.
CORS(app, expose_headers=['Content-Disposition'])

# 파일 수정 및 다운로드 엔드포인트
@app.route('/api/download_modified', methods=['POST'])
def download_modified_file():
    if 'file' not in request.files:
        # 파일이 없을 경우, JSON 오류 메시지와 400 상태 코드를 반환
        return jsonify({"error": "파일을 선택해주세요."}), 400
    
    file = request.files['file']

    try:
        # ===============================================
        # 1. 5초 지연 시간 추가 (의도적인 서버 작업 시간 시뮬레이션)
        print("서버: 5초 동안 의도적으로 작업을 지연합니다...")
        time.sleep(5) 
        print("서버: 지연 시간 종료. 파일 처리 시작.")
        # ===============================================

        # 2. 파일 내용 읽기 및 수정
        # 텍스트 파일 실험을 위해 UTF-8로 디코딩합니다.
        original_content = file.read().decode('utf-8')
        modified_content = original_content + "\n\n수정됨"

        # 3. 수정된 내용을 메모리상의 파일로 생성
        modified_file = BytesIO(modified_content.encode('utf-8'))
        
        # 4. 다운로드될 파일 이름 설정: 텍스트 파일 형식으로 복원
        original_filename = file.filename
        
        # .txt 확장자를 가진 파일로 다운로드되도록 이름 수정
        if original_filename.lower().endswith('.txt'):
            download_filename = original_filename.replace('.txt', '_abcd.txt')
        else:
            # .txt 확장자가 없는 경우를 대비하여 확장자를 추가합니다.
            download_filename = original_filename + '_abcd.txt'


        # 5. 파일을 응답으로 전송 (헤더 자동 설정)
        return send_file(
            modified_file,
            mimetype='text/plain', # MIME 타입은 텍스트 파일로 유지
            as_attachment=True,    
            download_name=download_filename # 다운로드될 파일명 지정
        )

    except Exception as e:
        # 예외 발생 시 JSON 오류 메시지 반환
        print(f"Server Error: {e}") 
        return jsonify({"error": f"서버 파일 처리 중 오류 발생: {str(e)}"}), 500

if __name__ == '__main__':
    # 서버 실행: Ctrl+C로 종료 후 이 코드를 다시 실행해야 합니다.
    app.run(debug=True, port=5000)
from flask_cors import CORS
from io import BytesIO
import time  # time 모듈 추가

app = Flask(__name__)

# -------------------------------------------------------------
# CORS 설정 수정: Content-Disposition 헤더를 프론트엔드에 노출해야 합니다.
CORS(app, expose_headers=['Content-Disposition'])

# 파일 수정 및 다운로드 엔드포인트
@app.route('/api/download_modified', methods=['POST'])
def download_modified_file():
    if 'file' not in request.files:
        # 파일이 없을 경우, JSON 오류 메시지와 400 상태 코드를 반환
        return jsonify({"error": "파일을 선택해주세요."}), 400
    
    file = request.files['file']

    try:
        # ===============================================
        # 1. 5초 지연 시간 추가 (의도적인 서버 작업 시간 시뮬레이션)
        print("서버: 5초 동안 의도적으로 작업을 지연합니다...")
        time.sleep(5) 
        print("서버: 지연 시간 종료. 파일 처리 시작.")
        # ===============================================

        # 2. 파일 내용 읽기 및 수정
        # 텍스트 파일 실험을 위해 UTF-8로 디코딩합니다.
        original_content = file.read().decode('utf-8')
        modified_content = original_content + "\n\n수정됨"

        # 3. 수정된 내용을 메모리상의 파일로 생성
        modified_file = BytesIO(modified_content.encode('utf-8'))
        
        # 4. 다운로드될 파일 이름 설정: 텍스트 파일 형식으로 복원
        original_filename = file.filename
        
        # .txt 확장자를 가진 파일로 다운로드되도록 이름 수정
        if original_filename.lower().endswith('.txt'):
            download_filename = original_filename.replace('.txt', '_abcd.txt')
        else:
            # .txt 확장자가 없는 경우를 대비하여 확장자를 추가합니다.
            download_filename = original_filename + '_abcd.txt'


        # 5. 파일을 응답으로 전송 (헤더 자동 설정)
        return send_file(
            modified_file,
            mimetype='text/plain', # MIME 타입은 텍스트 파일로 유지
            as_attachment=True,    
            download_name=download_filename # 다운로드될 파일명 지정
        )

    except Exception as e:
        # 예외 발생 시 JSON 오류 메시지 반환
        print(f"Server Error: {e}") 
        return jsonify({"error": f"서버 파일 처리 중 오류 발생: {str(e)}"}), 500

if __name__ == '__main__':
    # 서버 실행: Ctrl+C로 종료 후 이 코드를 다시 실행해야 합니다.
    app.run(debug=True, port=5000)