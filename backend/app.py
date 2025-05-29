from flask import Flask, request, jsonify
from api import scan_url, scan_ip, scan_domain

app = Flask(__name__)

@app.route("/")
def home():
    return "TI-HUNT VirusTotal Backend is running."

@app.route("/scan-url", methods=["POST"])
def scan_url_route():
    data = request.json
    if not data or "url" not in data:
        return jsonify({"error": "Missing 'url' in request"}), 400
    try:
        result = scan_url(data["url"])
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/scan-ip", methods=["POST"])
def scan_ip_route():
    data = request.json
    if not data or "ip" not in data:
        return jsonify({"error": "Missing 'ip' in request"}), 400
    try:
        result = scan_ip(data["ip"])
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/scan-domain", methods=["POST"])
def scan_domain_route():
    data = request.json
    if not data or "domain" not in data:
        return jsonify({"error": "Missing 'domain' in request"}), 400
    try:
        result = scan_domain(data["domain"])
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
