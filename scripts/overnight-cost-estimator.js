'use strict';

window.onload = () => {
  const estimateForm = document.getElementById('estimateForm');
  estimateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    displayQuote();
  });
};

function displayQuote() {
  //get all required elements
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const checkinDateValue = document.getElementById('checkinDate').value;
  const numNights = document.getElementById('numNights').value;
  const roomType = getRoomType(document.getElementsByName('roomType'));
  const partySize = getPartySize(
    document.getElementById('numAdults').value,
    document.getElementById('numChildren').value
  );
  const discount = getDiscount(document.getElementsByName('discounts'));

  console.log(fullName);
  console.log(roomType);
  console.log(partySize);
  console.log(discount);
}

function getRoomType(listOfRooms) {
  let roomType;
  listOfRooms.forEach((room) => {
    if (room.checked) {
      roomType = room.value;
    }
  });
  return roomType;
}

function getPartySize(numAdults, numChildren) {
  const adults = +numAdults;
  const children = +numChildren;
  return { adults, children };
}

function getDiscount(listOfDiscounts) {
  let discountType;
  listOfDiscounts.forEach((discount) => {
    if (discount.checked) {
      discountType = discount.value;
    }
  });
  return discountType;
}
