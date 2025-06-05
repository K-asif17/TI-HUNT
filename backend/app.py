from flask import Flask, request, jsonify
from flask_cors import CORS  # Allow requests from React frontend
from api import scan_url, scan_ip, scan_domain, scan_file,scan_hash

app = Flask(__name__)
  # Enable CORS
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})


@app.route("/")
def home():
    return "TI-HUNT VirusTotal Backend is running."

def extract_required_data(vt_response):
    try:
        attributes = vt_response.get("data", {}).get("attributes", {})
        return {
            "crowdsourced_context": attributes.get("crowdsourced_context", []),
            "last_analysis_stats": attributes.get("last_analysis_stats", {})
        }
    except Exception as e:
        return {"error": "Invalid response structure", "details": str(e)}

@app.route("/scan-url", methods=["POST"])
def scan_url_route():
    data = request.json
    if not data or "url" not in data:
        return jsonify({"error": "Missing 'url' in request"}), 400
    try:
        result = scan_url(data["url"])
        return jsonify(extract_required_data(result))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/scan-ip", methods=["POST"])
def scan_ip_route():
    data = request.json
    if not data or "ip" not in data:
        return jsonify({"error": "Missing 'ip' in request"}), 400
    try:
        result = scan_ip(data["ip"])
        return jsonify(extract_required_data(result))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/scan-domain", methods=["POST"])
def scan_domain_route():
    data = request.json
    if not data or "domain" not in data:
        return jsonify({"error": "Missing 'domain' in request"}), 400
    try:
        result = scan_domain(data["domain"])
        return jsonify(extract_required_data(result))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/scan-hash", methods=["POST"])
def scan_hash_route():
    data = request.json
    if not data or "hash" not in data:
        return jsonify({"error": "Missing 'hash' in request"}), 400
    try:
        result = scan_hash(data["hash"])
        return jsonify(extract_required_data(result))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/scan-file", methods=["POST"])
def scan_file_route():
    if 'file' not in request.files:
        return jsonify({"error": "No file part in request"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    try:
        result = scan_file(file)
        return jsonify(extract_required_data(result))
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
