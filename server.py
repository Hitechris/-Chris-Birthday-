#!/usr/bin/env python3
"""
Simple HTTP server to serve static files for Christopher Hite's Birthday Website
This server runs on port 5000 and serves files from the public directory
"""

import http.server
import socketserver
import os

PORT = 5000
DIRECTORY = "public"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Disable caching for development
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("0.0.0.0", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🎉 Birthday website server running on port {PORT}")
        print(f"Serving files from: {os.path.abspath(DIRECTORY)}")
        print(f"Open your browser to see Christopher's birthday celebration! 🎂")
        httpd.serve_forever()
