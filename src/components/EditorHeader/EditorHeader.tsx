/** @jsxImportSource @emotion/react */
import { useState } from "react";
import {
  headerCss,
  buttonCss,
  shareButtonCss,
  shareContainerCss,
  shareCodeCss,
  joinInputCss,
} from "./EditorHeader.styles";

interface EditorHeaderProps {
  isMobile: boolean;
  onBack: () => void;
  connectCode: string | null;
  onEnableSharing: () => void;
  onJoinSession: (code: string) => void;
}

export const EditorHeader = ({
  isMobile,
  onBack,
  connectCode,
  onEnableSharing,
  onJoinSession,
}: EditorHeaderProps) => {
  const [joinCode, setJoinCode] = useState("");

  const handleJoin = () => {
    if (joinCode) {
      onJoinSession(joinCode);
      setJoinCode("");
    }
  };

  const handleCopy = () => {
    if (connectCode) {
      navigator.clipboard.writeText(connectCode);
      alert("Share code copied to clipboard!");
    }
  };

  return (
    <div css={headerCss}>
      <div>
        {isMobile && (
          <button onClick={onBack} css={buttonCss}>
            ← Back
          </button>
        )}
      </div>
      <div css={shareContainerCss}>
        {connectCode ? (
          <div css={shareCodeCss} onClick={handleCopy} title="Click to copy">
            <span>Share Code:</span>
            <strong>{connectCode}</strong>
          </div>
        ) : (
          <>
            <div>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="Enter share code..."
                css={joinInputCss}
              />
              <button onClick={handleJoin} css={buttonCss}>
                Join
              </button>
            </div>
            <button onClick={onEnableSharing} css={shareButtonCss}>
              Share
            </button>
          </>
        )}
      </div>
    </div>
  );
};
