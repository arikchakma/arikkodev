function SuccessIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.31649 0.768751C7.40404 0.423671 10.5954 0.423671 13.683 0.768751C14.8422 0.898309 15.8598 1.52519 16.5035 2.43558L8.49976 10.4393L6.03009 7.96967C5.73719 7.67678 5.26232 7.67678 4.96943 7.96967C4.67653 8.26256 4.67653 8.73744 4.96943 9.03033L7.96943 12.0303C8.26232 12.3232 8.73719 12.3232 9.03009 12.0303L17.1455 3.9149C17.168 4.02446 17.1859 4.13572 17.1991 4.24848C17.5683 7.4054 17.5683 10.5946 17.1991 13.7515C16.9843 15.5885 15.5094 17.0271 13.683 17.2312C10.5954 17.5763 7.40404 17.5763 4.31649 17.2312C2.49011 17.0271 1.01521 15.5885 0.80036 13.7515C0.43113 10.5946 0.43113 7.4054 0.80036 4.24848C1.01521 2.41152 2.49011 0.972876 4.31649 0.768751Z"
        className="fill-green-500"
      />
    </svg>
  );
}

export default function SuccessMessage({ children }) {
  return (
    <div className="flex items-center">
      <SuccessIcon />
      <p className="ml-2 text-base font-normal text-green-500">{children}</p>
    </div>
  );
}
