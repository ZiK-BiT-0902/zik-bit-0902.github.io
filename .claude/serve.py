# Local preview server that tells the browser not to cache, so edits always show on reload.
import http.server, functools
class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
http.server.ThreadingHTTPServer(('', 8000), functools.partial(NoCache, directory='.')).serve_forever()
