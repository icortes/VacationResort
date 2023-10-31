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
  const checkinDate = new Date(checkinDateValue.replace(/-/g, '/'));
  const numNights = document.getElementById('numNights').value;
  const roomType = document.querySelector('input[name="roomType"]:checked').value;
  const partySize = getPartySize(
    document.getElementById('numAdults').value,
    document.getElementById('numChildren').value
  );
  const discountType = document.querySelector('input[name="discounts"]:checked').value;

  let roomRate = getRoomRate(checkinDate, roomType);
  let discount = getDiscount(discountType);

  validateParty(partySize.adults + partySize.children, roomType);

  let originalRoomCost = roomRate * numNights;
  let discountOfRoomCost = originalRoomCost * discount;
  let discountedRoomCost = originalRoomCost - discountOfRoomCost;
  let taxAfterDiscountedRoomCost = discountedRoomCost * 0.12;
  let total = discountedRoomCost - taxAfterDiscountedRoomCost;

  //output results
  document.getElementById('originalRoomCost').value = `$${originalRoomCost.toFixed(2)}`;
  document.getElementById('discount').value = `-$${discountOfRoomCost.toFixed(2)}`;
  document.getElementById('discountedRoomCost').value = `$${discountedRoomCost.toFixed(
    2
  )}`;
  document.getElementById('tax').value = `$${taxAfterDiscountedRoomCost.toFixed(2)}`;
  document.getElementById('totalCost').value = `$${total.toFixed(2)}`;
  document.getElementById('confirmationNumber').innerText = generateConfirmationNumber(
    fullName,
    checkinDate,
    numNights,
    partySize
  );
}

function getPartySize(numAdults, numChildren) {
  const adults = +numAdults;
  const children = +numChildren;
  return { adults, children };
}

function getRoomRate(checkin, room) {
  const checkinMonth = checkin.getMonth();
  if (checkinMonth >= 5 && checkinMonth <= 7) {
    switch (room) {
      case 'queen':
        return 250;
      case 'king':
        return 250;
      case '2BedSuite':
        return 350;
      default:
        return -1;
    }
  } else {
    switch (room) {
      case 'queen':
        return 150;
      case 'king':
        return 150;
      case '2BedSuite':
        return 210;
      default:
        return -1;
    }
  }
}

function getDiscount(discountType) {
  switch (discountType) {
    case 'none':
      return 0;
    case 'senior':
      return 0.1;
    case 'military':
      return 0.2;
    default:
      return -1;
  }
}

function validateParty(partySize, roomType) {
  switch (roomType) {
    case 'queen':
      if (partySize > 5) {
        alert('The room you selected will not hold your party.');
        throw new Error('The room you selected will not hold your party.');
      }
      break;
    case 'king':
      if (partySize > 2) {
        alert('The room you selected will not hold your party.');
        throw new Error('The room you selected will not hold your party.');
      }
      break;
    case '2BedSuite':
      if (partySize > 6) {
        alert('The room you selected will not hold your party.');
        throw new Error('The room you selected will not hold your party.');
      }
      break;
  }
}

function generateConfirmationNumber(name, date, days, party) {
  return `${name
    .substring(0, 3)
    .toUpperCase()}-${date.getMonth()}${date.getFullYear()}-${days}:${party.adults}:${
    party.children
  }`;
}
