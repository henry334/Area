import { useEffect } from 'react';

const DownloadPage = () => {
  useEffect(() => {
    const link = document.createElement('a');
    link.href = './mobile.apk';
    link.download = 'mobile.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <a
        href="./mobile.apk"
        download
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full"
      >
        Click here if your download doesn't start automatically
      </a>
    </div>
  );
};

export default DownloadPage;
