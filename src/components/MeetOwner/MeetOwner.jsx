import React from 'react';
import { useInView } from 'react-intersection-observer';
import './style.css'

const MeetTheOwner = () => {
    const [ref, inView] = useInView({
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto', padding: '40px 20px' }} ref={ref}>
            <div className="container-2">
                <div className="row align-items-center">
                    <h2 className={`section-title ${inView ? 'slide-in-left' : ''}`}>Meet the Owner</h2>
                    <h1 className={`owner-name ${inView ? 'slide-in-left' : ''}`}>Sarangi Warnakulasooriya</h1>
                    <p className={`owner-description ${inView ? 'slide-in-left' : ''}`}>
                        Welcome to our salon, a sanctuary of beauty and relaxation nestled in the heart of Kandy.
                        I am Sarangi, and I have over 8 years of experience in the beauty industry.
                        My passion is to help individuals express their unique beauty and boost their confidence.
                    </p>
                    <div className="col-md-5 col-sm-12 text-center mb-4 zoom-in">
                        <img src="owner.png" alt="Owner - Sarangi Warnakulasooriya" className="img-fluid owner-image" style={{ width: '100%', borderRadius: '8px' }} />
                    </div>
                    <div className="col-md-7 col-sm-12 text-center text-md-start">
                        <h3 className={`qualification-title ${inView ? 'slide-in-left' : ''}`}>Qualifications</h3>
                        <ul className="qualifications-list">
                            <li>Certified Beauty Specialist</li>
                            <li>Advanced Hair Styling Techniques</li>
                            <li>Skincare and Makeup Expert</li>
                            <li>Member of the Sri Lanka Beauty Association</li>
                        </ul>
                        <h3 className={`services-title ${inView ? 'slide-in-left' : ''}`}>Services Offered</h3>
                        <p className={`services-description ${inView ? 'slide-in-left' : ''}`}>At our salon, we provide a range of services including:</p>
                        <ul className="services-list">
                            <li>Haircuts & Styling</li>
                            <li>Facials & Skin Treatments</li>
                            <li>Makeup Services for Special Occasions</li>
                            <li>Nail Care & Manicures</li>
                        </ul>
                    </div>
                    <h3 className={`personal-note-title ${inView ? 'slide-in-left' : ''}`} style={{ marginTop: '30px' }}>A Personal Note</h3>
                    <p className={`personal-note ${inView ? 'slide-in-left' : ''}`}>
                        I believe that beauty is not just about appearance but also about feeling confident and happy in your skin.
                        I strive to create a warm and welcoming environment where every client feels valued and special.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MeetTheOwner;
