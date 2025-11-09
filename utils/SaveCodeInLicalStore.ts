// ...existing code...
export const saveLocalStorege = (code: string) => {
  try {
    const raw = localStorage.getItem("banglaCode");
    const list: string[] = raw ? JSON.parse(raw) as string[] : [];
    list.push(code);
    localStorage.setItem("banglaCode", JSON.stringify(list));
  } catch (err) {
    console.error("saveLocalStorege: failed to save", err);
  }
};

export const getSavedCodes = (): string[] => {
  try {
    const raw = localStorage.getItem("banglaCode");
    return raw ? JSON.parse(raw) as string[] : [];
  } catch (err) {
    console.error("getSavedCodes: failed to read", err);
    return [];
  }
};
// ...existing code...