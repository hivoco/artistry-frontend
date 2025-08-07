export   const languages = ["english", "hindi"];

export const BASE_URL = "https://api.artistry.thefirstimpression.ai";

export   function debounce(fn, delay) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

