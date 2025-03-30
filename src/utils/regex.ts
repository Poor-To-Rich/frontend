export const userNameRegex = /^[A-Za-z0-9]+$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-])[A-Za-z\d!@#$%^&*()_+={}[\]:;"'<>,.?/\\|-]+$/;

export const koreanOnlyRegex = /^[가-힣]+$/;

export const nicknameRegex = /^[A-Za-z가-힣ㄱ-ㅎ][A-Za-z가-힣0-9ㄱ-ㅎ]*$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const dayRegex = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12][0-9]|3[01])$/;
