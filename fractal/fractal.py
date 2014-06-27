import webapp2

class MainPage(webapp2.RequestHandler):
    def get(self):
        with open("./index.html", "r") as f:
            for line in f.readlines():
                self.response.write(line)

application = webapp2.WSGIApplication([
    ("/", MainPage),
#    ("/js/(.*)", webapp2.)
], debug=True)
