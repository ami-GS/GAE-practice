import webapp2
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext.webapp import template

class MainPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect(users.create_login_url(self.request.uri))
            return

        token = channel.create_channel(user.user_id())
        template_values = {
            'token':token,
            'me':user,
            }
        self.response.out.write(template.render('index.html', template_values))


class EchoPage(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        channel.send_message(user.user_id(), self.request.body)

application = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/echo", EchoPage),
    ], debug=True)
