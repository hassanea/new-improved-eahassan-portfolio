const handleAbbreviate = (str: string) =>
  str
    .split(" ")
    .map((word) => word.slice(0, 1))
    .join("");

const handleCapitalize = (str: string) =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;

const toggleClass = (element: HTMLElement, mode: string) => {
  element?.classList.add(mode);
};

const removeClass = (element: HTMLElement, mode: string) => {
  element?.classList.remove(mode);
};

const getModeFromStorage = (
  storageOption: string = "localStorage",
  storageKey: string,
) => {
  if (storageKey && storageKey) {
    if (storageOption === "localStorage") {
      return window && window?.localStorage
        ? localStorage?.getItem(storageKey)
        : null;
    } else if (storageOption === "sessionStorage") {
      return window && window?.sessionStorage
        ? sessionStorage?.getItem(storageKey)
        : null;
    } else {
      return useCookie(storageKey).value || null;
    }
  }
};

const setModeToStorage = (
  storageOption: string = "localStorage",
  storageKey: string,
  mode: string,
) => {
  if (storageOption && storageKey && mode) {
    if (storageOption === "localStorage") {
      return window && window?.localStorage
        ? localStorage?.setItem(storageKey, mode)
        : null;
    } else if (storageOption === "sessionStorage") {
      return window && window?.sessionStorage
        ? sessionStorage?.setItem(storageKey, mode)
        : null;
    } else {
      useCookie(storageKey, {
        default: () => {
          return "";
        },
        maxAge: 31_536_000, // A year in seconds...
        watch: true,
      });
      return (useCookie(storageKey).value = mode);
    }
  }
};

const removeLocalStorageData = () => localStorage.clear();

export {
  handleAbbreviate,
  handleCapitalize,
  getModeFromStorage,
  setModeToStorage,
  removeLocalStorageData,
  toggleClass,
  removeClass,
};
