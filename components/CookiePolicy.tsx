
import React from 'react';

interface CookiePolicyProps {
    onBackToTool: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onBackToTool }) => {
    const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <div className="bg-white">
            <main className="container mx-auto px-4 py-16 lg:py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center">
                        <h1 className="text-5xl font-extrabold gradient-text mb-4">Cookie Policy</h1>
                        <p className="text-xl text-gray-600 mb-12">Last updated: {currentDate}</p>
                    </div>
                    <div className="text-gray-700 space-y-6 text-left">
                        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files stored on your device (computer, tablet, mobile phone) when you visit certain websites. They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                        </p>

                        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">2. How We Use Cookies</h2>
                        <p>
                            This website uses cookies to enhance your experience and to display personalized advertising. The primary use of cookies on this site is for serving ads through Google AdSense.
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                <strong>Third-Party Cookies:</strong> We use Google AdSense to show advertisements on our site. Google AdSense may use cookies to serve ads based on a user's prior visits to this website or other websites.
                            </li>
                            <li>
                                Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.
                            </li>
                        </ul>

                        <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">3. Managing Cookies</h2>
                        <p>
                            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by setting or amending your web browser controls.
                        </p>
                        <ul className="list-disc list-inside space-y-2 pl-4">
                            <li>
                                You can opt out of personalized advertising by visiting Google's Ad Settings: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">https://www.google.com/settings/ads</a>.
                            </li>
                            <li>
                                Alternatively, you can opt out of a third-party vendor's use of cookies for personalized advertising by visiting <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.aboutads.info/choices</a>.
                            </li>
                            <li>
                                Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.aboutcookies.org</a> or <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">www.allaboutcookies.org</a>.
                            </li>
                        </ul>
                         <p>
                            If you choose to reject cookies, you may still use our website, though your access to some functionality and areas of our website may be restricted.
                        </p>

                         <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-3">4. Changes to This Cookie Policy</h2>
                        <p>
                            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                        </p>
                    </div>

                    <div className="text-center mt-12">
                         <button 
                            onClick={onBackToTool} 
                            className="px-8 py-3 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform" 
                            style={{ backgroundImage: 'var(--gradient-1)' }}
                        >
                            ← Back to the Tool
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CookiePolicy;
