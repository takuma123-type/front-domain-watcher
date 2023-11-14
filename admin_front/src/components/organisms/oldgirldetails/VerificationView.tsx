import React, { useState } from "react";

interface VerificationViewProps {
  oldGirlId: number;
}

const VerificationView: React.FC<VerificationViewProps> = ({ oldGirlId }) => {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  const sendVerificationRequest = async (verified: boolean) => {
    setIsVerified(verified);
    axios.post(`/admin/old_girls/${oldGirlId}/verify`, { is_verified: verified })
    console.log(`Sending verification: ${verified}`);
  };

  return (
    <div className="max-w-xs py-16 mx-auto text-center">
      <div className="flex justify-center space-x-4 mb-8">
        <img
          className="w-1/3"
          src="/images/blue-pkmin.jpeg"
          alt="Verification Image 1"
        />
        <img
          className="w-1/3"
          src="/images/red-pikmin.jpeg"
          alt="Verification Image 2"
        />
      </div>
      <div className="flex justify-center space-x-4">
        <button
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          onClick={() => sendVerificationRequest(true)}
        >
          承認
        </button>
        <button
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
          onClick={() => sendVerificationRequest(false)}
        >
          拒否
        </button>
      </div>
    </div>
  );
};

export default VerificationView;
