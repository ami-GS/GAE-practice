import webapp2
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
    def get(self):
        token = channel.create_channel("test")
        template_values = {'token':token,}
        self.response.out.write(template.render('index.html', template_values))

    def post(self):
        print(self.request.body)

application = webapp2.WSGIApplication([
    ("/", MainPage),
    ], debug=True)
