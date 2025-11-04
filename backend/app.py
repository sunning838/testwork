from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from io import BytesIO
import time
import os # 파일 경로 관리를 위해 os 모듈 추가
#c:\Users\양태양\midi-extractor\frontend\public\drummer.png
#C:\Users\양태양\AppData\Local\Microsoft\WindowsApps\PythonSoftwareFoundation.Python.3.13_qbz5n2kfra8p0\python.exe app.py


app = Flask(__name__)

# -------------------------------------------------------------
# CORS 설정: Content-Disposition 헤더 노출
CORS(app, expose_headers=['Content-Disposition'])

# 파일 수정 및 다운로드 엔드포인트 (미디 파일 다운로드)
@app.route('/api/download_midi', methods=['POST'])
def download_midi_file():
    """
    미디 파일 생성을 시뮬레이션하고, 다운로드를 유발합니다.
    """
    if 'file' not in request.files:
        return jsonify({"error": "파일을 선택해주세요."}), 400
    
    file = request.files['file']

    try:
        # 1. 5초 지연 시간 추가 (음악 분석/처리 시뮬레이션)
        print("서버: 5초 동안 미디 파일 생성을 지연합니다...")
        time.sleep(1) 
        print("서버: 지연 시간 종료. 미디 파일 생성 완료.")

        # 2. 가상 미디 파일 내용 생성
        original_filename = file.filename
        modified_file_content = f"// MIDI Score Data for {original_filename}\n" + "Generated Drum Beats."
        download_data = BytesIO(modified_file_content.encode('utf-8'))
        
        # 3. 다운로드될 파일 이름 설정
        if '.' in original_filename:
            name_part = original_filename.rsplit('.', 1)[0]
            download_filename = f"{name_part}_score.midi"
        else:
             download_filename = original_filename + "_score.midi"

        # 4. 파일을 응답으로 전송 (다운로드 실행)
        return send_file(
            download_data,
            mimetype='audio/midi', 
            as_attachment=True,    
            download_name=download_filename
        )

    except Exception as e:
        print(f"Server Error in MIDI: {e}") 
        return jsonify({"error": f"미디 파일 처리 중 서버 오류 발생: {str(e)}"}), 500

# PDF 파일 내용 전송 엔드포인트 (사이트 출력용)
@app.route('/api/get_pdf_content', methods=['POST'])
def get_pdf_content():
    """
    프런트엔드 요청에 대해 로컬 test.pdf 파일의 내용을 전송합니다.
    (이 파일은 C:\\testwork\\backend 경로에 있어야 함)
    """
    # ⚠️ 경고: 실제 환경에서는 'C:\\' 경로 대신 상대 경로를 사용하는 것이 좋습니다.
    # 사용자의 요청에 따라 절대 경로를 사용하여 파일 존재 여부 확인
    PDF_FILE_PATH = 'C:\\testwork\\backend\\test.pdf'
    
    # 파일을 읽기 전에 파일이 존재하는지 확인
    if not os.path.exists(PDF_FILE_PATH):
         return jsonify({"error": f"PDF 파일이 서버 경로에 없습니다: {PDF_FILE_PATH}"}), 404

    try:
        # PDF 파일 내용 읽기
        with open(PDF_FILE_PATH, 'rb') as pdf_file:
            pdf_data = pdf_file.read()
        
        # 바이트 데이터를 BytesIO에 담아 전송
        pdf_bytes = BytesIO(pdf_data)
        
        # 파일을 응답으로 전송 (다운로드가 아닌, 내용물 자체 전송)
        return send_file(
            pdf_bytes,
            mimetype='application/pdf', 
            as_attachment=False, # 다운로드가 아닌 브라우저에 내용 자체를 표시하도록 설정
            download_name='test_score.pdf' # 임시 파일명
        )

    except Exception as e:
        print(f"Server Error in PDF: {e}") 
        return jsonify({"error": f"PDF 파일 전송 중 오류 발생: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True, port=5000)