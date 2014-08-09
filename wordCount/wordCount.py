import webapp2
from google.appengine.api import channel
from google.appengine.api import users
from google.appengine.ext.webapp import template
from google.appengine.api import memcache
import json

class MainPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if not user:
            self.redirect(users.create_login_url(self.request.uri))
            return
        cache = memcache.get(user.user_id())
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
            #storedM = '{"t":"","c":""}'
        else :
            try:
                stored = json.loads(storedM)
            except Exception as e:
                print e
        """
        sent = json.loads(sentM)
        if int(sent["c"][-1]) == 1:
            rmIdx = stored.rindex(sent["c"][:-1])
            store = json.dump({"t":sent["t"], "c":stored["c"][:rmIdx]})
            memcache.set(key=user.user_id(), value=store)
        elif int(sent["c"][-1] == 2):
            store = json.dump({"t":sent["t"], "c":store["c"]+sent["c"][:-1]})
            memcache.set(key=user.user_id(), value=store)
        """
        if int(sentM[-1]) == 1:
            rmIdx = storedM.rindex(sentM[:-1])
            memcache.set(key=user.user_id(), value=storedM[:rmIdx])
        elif int(sentM[-1]) == 2:
            memcache.set(key=user.user_id(), value=storedM+sentM[:-1])


application = webapp2.WSGIApplication([
    ("/", MainPage),
    ("/echo", SavePage),
    ], debug=True)
