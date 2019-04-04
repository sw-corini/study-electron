document.body.querySelector('#event-noti').addEventListener('click', function() {
	let myNotification = new Notification('알림을 보냅니다.', {
		body: '뭔 알림을 보내야 할지 아직 모르겠어요'
	});

	myNotification.onclick = () => {
		alert('알림 눌렀다');
	};
});
