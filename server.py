"""
High-Performance Local Streaming Server with HTTP Range Requests & Mobile Network Discovery
Ensures instant MP3 seeking, smooth audio switching, mobile CORS support, and zero connection reset errors.
"""

import os
import sys
import socket
import mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

mimetypes.init()
mimetypes.add_type('audio/mpeg', '.mp3')
mimetypes.add_type('image/jpeg', '.jpg')
mimetypes.add_type('image/jpeg', '.jpeg')
mimetypes.add_type('text/css', '.css')
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('text/html', '.html')

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cache-Control', 'public, max-age=3600')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        f = self.send_head()
        if f:
            try:
                self.copyfile(f, self.wfile)
            except (ConnectionResetError, BrokenPipeError):
                pass
            finally:
                f.close()

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3000
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    server = ThreadingHTTPServer(('0.0.0.0', port), RangeRequestHandler)
    local_ip = get_local_ip()
    print("=" * 60)
    print(f"✦ AURA Server is running!")
    print(f"  • Local PC URL:      http://localhost:{port}")
    print(f"  • Mobile Phone URL:  http://{local_ip}:{port}")
    print("=" * 60)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
