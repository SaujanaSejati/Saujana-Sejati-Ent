self.addEventListener('push',event=>{
 let data={title:'Saujana Sejati Ent',body:'Maklum balas baharu diterima.',url:'/Saujana-Sejati-Ent/feedback-admin.html'};
 try{if(event.data)data={...data,...event.data.json()};}catch(_){}
 event.waitUntil(self.registration.showNotification(data.title||'Saujana Sejati Ent',{
  body:data.body||'Maklum balas baharu diterima.',
  icon:'/Saujana-Sejati-Ent/favicon.ico',
  badge:'/Saujana-Sejati-Ent/favicon.ico',
  tag:data.tag||'saujana-notification',
  data:{url:data.url||'/Saujana-Sejati-Ent/feedback-admin.html'},
  renotify:true
 }));
});
self.addEventListener('notificationclick',event=>{
 event.notification.close();
 const target=new URL(event.notification.data?.url||'/Saujana-Sejati-Ent/feedback-admin.html',self.location.origin).href;
 event.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(list=>{
  for(const client of list){if('focus' in client)return client.navigate(target).then(()=>client.focus());}
  return clients.openWindow(target);
 }));
});