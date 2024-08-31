// components/QRScanner.tsx
import { useEffect, useRef } from 'react';
import jsQR from 'jsqr';
import styles from './style.module.scss';

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    startVideo();
  }, []);

  useEffect(() => {
    const scanQRCode = () => {
      if (videoRef.current && canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (context && videoRef.current.readyState === 4) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);

          if (code) {
            onScan(code.data);
          }
        }
      }
      requestAnimationFrame(scanQRCode);
    };

    scanQRCode();
  }, [onScan]);

  return (
    <div className={styles.scannerContainer}>
      <video ref={videoRef} className={styles.video} />
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.frame}>
        <div className={styles.frameCorner}></div>
        <div className={styles.frameCorner}></div>
        <div className={styles.frameCorner}></div>
        <div className={styles.frameCorner}></div>
      </div>
    </div>
  );
};

export default QRScanner;
