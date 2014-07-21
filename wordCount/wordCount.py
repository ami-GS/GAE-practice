import webapp2
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.api import memcache

class MainPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        cache = memcache.get(user.user_id())
        if not user:
            self.redirect(users.create_login_url(self.request.uri))
            return
        if cache:
            channel.send_message(user.user_id(), cache)

        token = channel.create_channel(user.user_id())
        template_values = {
            'token':token,
            'me':user,
            }
        self.response.out.write(template.render('index.html', template_values))


class SavePage(webapp2.RequestHandler):
    def post(self):
        user = users.get_current_user()
        sentM = self.request.body
        storedM = memcache.get(user.user_id())

        if not storedM:
            storedM = ""

        if int(sentM[-1]) == 1:
            rmIdx = storedM.rindex(sentM[:-1])
            memcache.set(key=user.user_id(), value=storedM[:rmIdx])
        elif int(sentM[-1]) == 2:
            memcache.set(key=user.user_id(), value=storedM+sentM[:-1])


application = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/echo", SavePage),
    ], debug=True)
