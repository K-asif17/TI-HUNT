import requests
import time
import base64

VT_API_KEY = "YOUR_VIRUSTOTAL_API_KEY"  # Replace with your actual API key
HEADERS = {"x-apikey": VT_API_KEY}

def scan_url(url):
    # Step 1: Submit the URL to VirusTotal for scanning
    scan_resp = requests.post(
        "https://www.virustotal.com/api/v3/urls",
        headers=HEADERS,
        data={"url": url}
    )
    scan_resp.raise_for_status()

    # Step 2: Extract the analysis ID from the response
    analysis_id = scan_resp.json()["data"]["id"]

    # Step 3: Poll the analysis endpoint until it's completed
    analysis_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"
    for _ in range(10):  # Try for up to ~30 seconds
        analysis_resp = requests.get(analysis_url, headers=HEADERS)
        analysis_resp.raise_for_status()
        analysis_data = analysis_resp.json()["data"]
        status = analysis_data["attributes"]["status"]
        if status == "completed":
            break
        print("Waiting for URL scan analysis to complete...")
        time.sleep(3)
    else:
        raise Exception("Scan analysis timed out.")

    # Step 4: Encode the URL in URL-safe base64 format (strip trailing '=')
    url_id = base64.urlsafe_b64encode(url.encode()).decode().strip("=")

    # Step 5: Get the full report using the encoded URL ID
    report_resp = requests.get(
        f"https://www.virustotal.com/api/v3/urls/{url_id}",
        headers=HEADERS
    )
    report_resp.raise_for_status()

    return report_resp.json()



def scan_ip(ip_address):
    resp = requests.get(
        f"https://www.virustotal.com/api/v3/ip_addresses/{ip_address}",
        headers=HEADERS
    )
    resp.raise_for_status()
    return resp.json()

def scan_hash(hash_value):
    resp = requests.get(
        f"https://www.virustotal.com/api/v3/files/{hash_value}",
        headers=HEADERS
    )
    resp.raise_for_status()
    return resp.json()

def scan_domain(domain):
    resp = requests.get(
        f"https://www.virustotal.com/api/v3/domains/{domain}",
        headers=HEADERS
    )
    resp.raise_for_status()
    return resp.json()

def scan_file(file_obj):
    # Step 1: Upload the file
    upload_url = "https://www.virustotal.com/api/v3/files"
    files = {"file": (file_obj.filename, file_obj.stream, file_obj.mimetype)}
    upload_response = requests.post(upload_url, headers=HEADERS, files=files)
    upload_response.raise_for_status()

    analysis_id = upload_response.json()["data"]["id"]

    # Step 2: Poll the analysis report until it's ready
    report_url = f"https://www.virustotal.com/api/v3/analyses/{analysis_id}"

    while True:
        report_response = requests.get(report_url, headers=HEADERS)
        report_response.raise_for_status()
        report_json = report_response.json()
        status = report_json["data"]["attributes"]["status"]
        
        if status == "completed":
            return report_json  # ✅ Full scan report
        else:
            print("Waiting for analysis to complete...")
            time.sleep(3)