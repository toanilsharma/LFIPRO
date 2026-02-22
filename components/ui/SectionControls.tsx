
import React from 'react';
import Button from './Button';

interface SectionControlsProps {
    onNext?: () => void;
    onPrev?: () => void;
    nextDisabled?: boolean;
    prevDisabled?: boolean;
    nextText?: string;
}

const SectionControls: React.FC<SectionControlsProps> = ({ onNext, onPrev, nextDisabled = false, prevDisabled = false, nextText }) => {
    return (
        <div className="flex gap-3 mt-6 flex-wrap">
            {onPrev && <Button onClick={onPrev} variant="secondary" disabled={prevDisabled}>← Previous</Button>}
            {onNext && <Button onClick={onNext} variant="primary" disabled={nextDisabled}>{nextText || 'Next'} →</Button>}
        </div>
    );
};

export default SectionControls;
