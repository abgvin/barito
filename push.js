var webPush = require('web-push');

const vapidKeys = {
  "publicKey": "BPYJuW7C2VkGOuZXkac9RHXvogzSxqYeYLPeqzFMioyzyH2IwZX_56BldGRm8r4dD1VcULyLBwnmOJyvWRBQ5n8",
  "privateKey": "TnBDVgN4iEjr71hW5UJlrg6lD4vDZ0o-jx8H2rJUTwA"
};


webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/cX_ElpB8M_M:APA91bEJEkVGtO6G_r2Vgwlbu5r5LrrOMuwXOCBZLqZx6hBjpytGZWLestg4JQeLHjM7KiwVIgfeNrD6l8Igs22ly9v1eqpieG-cCkMVfNSin45izyJjfJzj6RyyQYAqlIipa1xC71dZ",
  "keys": {
    "p256dh": "BAoAVB2pI+a6E1fIzEbGm5HioaDW8jEFbjz4Ynr69Ai0QQk6RWjUrxTADUMMth+r30ip/R+Nd4ObodNVz/K7X+g=",
    "auth": "1GTdDx2mv99q0RCJTkrmdg=="
  }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
  gcmAPIKey: '62517894405',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);