import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, Check } from 'lucide-react';

interface ImageCropperProps {
    imageSrc: string;
    onComplete: (croppedBase64: string) => void;
    onCancel: () => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onComplete, onCancel }) => {
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 80,
        height: 80,
        x: 10,
        y: 10
    });
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleComplete = () => {
        if (!completedCrop || !imgRef.current || completedCrop.width === 0 || completedCrop.height === 0) {
            onComplete(imageSrc); // If no crop applied, return original
            return;
        }

        const canvas = document.createElement('canvas');
        const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
        const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
        canvas.width = completedCrop.width;
        canvas.height = completedCrop.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        ctx.drawImage(
            imgRef.current,
            completedCrop.x * scaleX,
            completedCrop.y * scaleY,
            completedCrop.width * scaleX,
            completedCrop.height * scaleY,
            0,
            0,
            completedCrop.width,
            completedCrop.height
        );

        // Apply compression and optional resizing if the cropped area is still massive
        const MAX_DIM = 800;
        let finalWidth = canvas.width;
        let finalHeight = canvas.height;

        if (finalWidth > finalHeight && finalWidth > MAX_DIM) {
            finalHeight *= MAX_DIM / finalWidth;
            finalWidth = MAX_DIM;
        } else if (finalHeight > MAX_DIM) {
            finalWidth *= MAX_DIM / finalHeight;
            finalHeight = MAX_DIM;
        }

        const resizeCanvas = document.createElement('canvas');
        resizeCanvas.width = finalWidth;
        resizeCanvas.height = finalHeight;
        const resizeCtx = resizeCanvas.getContext('2d');

        if (resizeCtx) {
            resizeCtx.drawImage(canvas, 0, 0, finalWidth, finalHeight);
            const base64 = resizeCanvas.toDataURL('image/jpeg', 0.6);
            onComplete(base64);
        } else {
            const base64 = canvas.toDataURL('image/jpeg', 0.6);
            onComplete(base64);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-4xl w-full p-6 shadow-2xl flex flex-col max-h-[90vh] border border-gray-200 dark:border-gray-800">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                        <span className="text-indigo-500">✂️</span> Crop Evidence Photo
                    </h3>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-auto min-h-0 flex items-center justify-center bg-gray-50 dark:bg-black/50 rounded-2xl p-4 border-2 border-dashed border-gray-200 dark:border-gray-800">
                    <ReactCrop
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={c => setCompletedCrop(c)}
                        className="max-w-full"
                    >
                        <img
                            ref={imgRef}
                            src={imageSrc}
                            alt="Crop preview"
                            className="max-h-[50vh] object-contain rounded-lg"
                        />
                    </ReactCrop>
                </div>

                <div className="mt-6 flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-gray-800">
                    <button
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleComplete}
                        className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 transition-transform hover:scale-105 shadow-md shadow-indigo-500/20"
                    >
                        <Check size={18} /> Apply Crop
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageCropper;
