import requests

VT_API_KEY = "71f6147fcc78d7441abc24bfef676a35f4abfc8036ad6019030b118fd9d8419d"
HEADERS = {"x-apikey": VT_API_KEY}

def scan_url(url):
    scan_resp = requests.post(
        "https://www.virustotal.com/api/v3/urls",
        headers=HEADERS,
        data={"url": url}
    )
    scan_resp.raise_for_status()
    analysis_id = scan_resp.json()["data"]["id"]

    result = requests.get(
        f"https://www.virustotal.com/api/v3/analyses/{analysis_id}",
        headers=HEADERS
    )
    return result.json()


def scan_ip(ip_address):
    resp = requests.get(
        f"https://www.virustotal.com/api/v3/ip_addresses/{ip_address}",
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
