const LOCAL_STORAGE_KEY = 'feedback-form-state';
let formData = { email: '', message: '' };

const form = document.querySelector('.feedback-form');
const localStorageData = localStorage.getItem(LOCAL_STORAGE_KEY);

if (localStorageData) {
  try {
    formData = JSON.parse(localStorageData);
  } catch (error) {
    console.error('Error parsing localStorage data:', error);
  }
}

Object.keys(formData).forEach(
  key => (form.elements[key].value = formData[key])
);

const throttle = (func, delay) => {
  let timeoutId;
  return function (...args) {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        func.apply(this, args);
        timeoutId = null;
      }, delay);
    }
  };
};

const handleFormInput = event => {
  const targetField = event.target;
  formData[targetField.name] = targetField.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
};

const handleFormSubmit = event => {
  event.preventDefault();

  const isEmptyField = Object.values(formData).some(
    value => value.trim() === ''
  );

  if (isEmptyField) {
    alert('Fill please all fields.');
    return;
  }

  console.log(formData);
  formData = { email: '', message: '' };
  form.reset();
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

form.addEventListener('input', throttle(handleFormInput, 500));
form.addEventListener('submit', handleFormSubmit);
