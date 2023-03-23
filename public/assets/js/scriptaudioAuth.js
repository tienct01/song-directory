window.onload = function () {
	const songItems = document.querySelectorAll("div[data-songurl]");
	const audio = document.querySelector("#audio-hidden");
	const audioContainer = document.querySelector(".audio-container");
	const img = audioContainer.querySelector(".song-info__imgbox");
	const songName = audioContainer.querySelector(
		".song-info-text [class$='name']"
	);
	const authorName = audioContainer.querySelector(
		".song-info-text [class$='author']"
	);

	songItems.forEach((item) => {
		const playBtn = item.querySelector(".button-play-song");
		playBtn.addEventListener("click", async () => {
			// const songData = JSON.parse(item.dataset["data-song"]);
			let songData = null;
			songData = item.dataset && item.dataset.song;
			audio.src = item.dataset.songurl;
			audio.play();

			if (songData) {
				const s = await fetch(`/songs/${songData}`).then((res) => res.json());
				console.log("data", s);
				img.src = `/${s.thumbnail}`;
				songName.textContent = s.songName;
				authorName.textContent = s.Author ? s.Author.authorName : "Unknow";
			}
		});
		const modalYesBtn = document.querySelector(
			"#verifyModal button[data-btn='yes']"
		);
		const modalCancelBtn = document.querySelector(
			"#verifyModal button[data-btn='cancel']"
		);
		const deleteForm = item.querySelector(".form-delete-song");
		const deleteBtn = item.querySelector(".button-delete-song");
		deleteBtn.addEventListener("click", () => {
			// Add click event for verify button, after click remove event from verify button
			const deleteListener = () => {
				deleteForm.submit();
				modalYesBtn.removeEventListener("click", deleteListener);
			};
			modalYesBtn.addEventListener("click", deleteListener);

			// Add click event for cancel button, after click cancel event from cancel button and itself
			const cancelListener = () => {
				modalYesBtn.removeEventListener("click", deleteListener);
				modalCancelBtn.removeEventListener("click", cancelListener);
			};
			modalCancelBtn.addEventListener("click", cancelListener);
		});
	});
};
