// app.js - handles service detail, order action
const WA_PHONE = "918209175150"; // +91 8209175150

// helper: read URL param
function getParam(name){
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

// On service-detail page: fill fields
function fillServiceDetail(){
  const service = getParam('service') || 'Selected Service';
  const price = getParam('price') || '';
  const desc = getParam('desc') || '';
  const elS = document.getElementById('sd_service');
  const elP = document.getElementById('sd_price');
  const elD = document.getElementById('sd_desc');
  if(elS) elS.textContent = service;
  if(elP) elP.textContent = price ? '₹' + price : '';
  if(elD) elD.textContent = desc;
}

// Order: open WhatsApp in new tab with message, then redirect current tab to order-placed
function orderNow(){
  const service = getParam('service') || document.getElementById('sd_service')?.textContent || 'Service';
  const price = getParam('price') || document.getElementById('sd_price')?.textContent || '';
  const name = document.getElementById('order_name')?.value || 'NoName';
  const phone = document.getElementById('order_phone')?.value || '-';
  const note = document.getElementById('order_note')?.value || '-';
  const orderId = 'LZ'+Date.now().toString().slice(-6);

  // build message
  const msg = `New Order from website\nOrderID: ${orderId}\nService: ${service}\nPrice: ${price}\nName: ${name}\nPhone: ${phone}\nNote: ${note}`;

  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;

  // open WA in new tab
  window.open(waUrl,'_blank');

  // redirect current tab to order placed (pass orderid)
  window.location.href = 'order-placed.html?oid='+encodeURIComponent(orderId)+'&service='+encodeURIComponent(service);
}

// On order-placed page: show order id
function showPlaced(){
  const oid = getParam('oid') || '—';
  const svc = getParam('service') || '';
  const el = document.getElementById('placed_id');
  const elm = document.getElementById('placed_service');
  if(el) el.textContent = oid;
  if(elm) elm.textContent = svc;
}

// run page-specific inits
document.addEventListener('DOMContentLoaded', ()=>{
  if(document.body.classList.contains('page-service-detail')) fillServiceDetail();
  if(document.body.classList.contains('page-order-placed')) showPlaced();
});
