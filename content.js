const newProfilePicUrl = 'https://cdn.pixabay.com/photo/2020/09/19/19/37/landscape-5585247_1280.jpg'; // Example image URL

function changeProfilePictures() {
  // Select all potential profile picture elements
  const profilePictures = document.querySelectorAll(`
    .feed-shared-actor__avatar-image, 
    .ivm-view-attr__img--centered, 
    .EntityPhoto-circle-3, 
    .update-components-actor__avatar-image, 
    .evi-image.lazy-image.ember-view,
    .profile-photo,
    .feed-shared-actor__image,
    .feed-shared-likers__liker-image,
    .feed-shared-likers__more-likers,
    .artdeco-entity-lockup__image,
    .comment-entity__avatar
  `);

  console.log(`Found ${profilePictures.length} profile pictures.`);

  profilePictures.forEach(picture => {
    // Ensure we are changing the profile pictures and not other post images
    if (
      picture.closest('.feed-shared-actor__container') || 
      picture.closest('.update-components-actor__container') || 
      picture.closest('.ivm-view-attr__container') || 
      picture.closest('.pv-top-card__photo') || 
      picture.closest('.profile-rail-card__actor-link') || 
      picture.closest('.feed-shared-likers') || 
      picture.closest('.artdeco-entity-lockup') || 
      picture.closest('.comment-entity__meta')
    ) {
      console.log(`Changing picture with src: ${picture.src}`);
      picture.src = newProfilePicUrl;
      picture.srcset = newProfilePicUrl;
    } else {
      console.log(`Skipping picture with src: ${picture.src} as it is not a profile picture`);
    }
  });
}

// Run the function initially
changeProfilePictures();

// Create a MutationObserver to watch for new posts being loaded dynamically
const observer = new MutationObserver((mutationsList) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
      console.log('New nodes added, changing profile pictures...');
      changeProfilePictures();
    }
  }
});

// Observe changes to the feed container
const feedContainer = document.querySelector('.scaffold-finite-scroll__content');
if (feedContainer) {
  observer.observe(feedContainer, { childList: true, subtree: true });
  console.log('Observer attached to feed container.');
} else {
  console.log('Feed container not found.');
}
