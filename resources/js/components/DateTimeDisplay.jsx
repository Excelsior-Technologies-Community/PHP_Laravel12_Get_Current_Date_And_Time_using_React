import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DateTimeDisplay = () => {
    const [currentDateTime, setCurrentDateTime] = useState({
        date: '',
        time: '',
        datetime: '',
        timezone: 'Asia/Kolkata',
        timestamp: '',
        indian_date: '',
        indian_time: '',
        festivals: [],
        day_info: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [autoRefresh, setAutoRefresh] = useState(false);
    const [timeFormat, setTimeFormat] = useState('24'); // '12' or '24'
    const [dateFormat, setDateFormat] = useState('dd-mm-yyyy'); // 'dd-mm-yyyy', 'yyyy-mm-dd', 'dd/mm/yyyy'

    // Styles
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '2rem',
            fontFamily: "'Poppins', 'Segoe UI', 'Roboto', 'Arial', sans-serif",
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
        },
        title: {
            fontSize: '3rem',
            fontWeight: '700',
            marginBottom: '0.5rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        },
        subtitle: {
            fontSize: '1.2rem',
            color: '#4a5568',
            fontWeight: '500',
            fontStyle: 'italic',
        },
        flagContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginTop: '1rem',
        },
        flagColor: {
            width: '40px',
            height: '6px',
            borderRadius: '3px',
        },
        saffron: { backgroundColor: '#FF9933' },
        white: { backgroundColor: '#FFFFFF', border: '1px solid #ddd' },
        green: { backgroundColor: '#138808' },
        ashokaChakra: {
            color: '#000080',
            fontSize: '1.5rem',
            margin: '0 10px',
        },
        mainCardContainer: {
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem',
        },
        card: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.4s ease',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
        },
        cardHover: {
            transform: 'translateY(-10px) scale(1.02)',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)',
        },
        cardHeader: {
            fontSize: '1.1rem',
            fontWeight: '600',
            marginBottom: '1.5rem',
            color: '#2d3748',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            borderBottom: '2px solid #e2e8f0',
            paddingBottom: '0.75rem',
        },
        // Date Card - Saffron theme
        dateCard: {
            background: 'linear-gradient(135deg, rgba(255, 153, 51, 0.1) 0%, rgba(255, 153, 51, 0.2) 100%)',
            border: '2px solid rgba(255, 153, 51, 0.3)',
        },
        dateText: {
            color: '#ff6b00',
            fontSize: '3rem',
            fontWeight: '800',
            textAlign: 'center',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        },
        indianDate: {
            fontSize: '2rem',
            color: '#d35400',
            textAlign: 'center',
            marginTop: '1rem',
            fontFamily: "'Noto Sans Devanagari', 'Arial', sans-serif",
        },
        // Time Card - White theme
        timeCard: {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%)',
            border: '2px solid rgba(255, 255, 255, 0.3)',
        },
        timeText: {
            color: '#2c3e50',
            fontSize: '3.5rem',
            fontWeight: '900',
            textAlign: 'center',
            letterSpacing: '2px',
            textShadow: '3px 3px 6px rgba(0,0,0,0.2)',
        },
        timePeriod: {
            fontSize: '1.5rem',
            color: '#7f8c8d',
            fontWeight: '600',
            marginLeft: '10px',
        },
        // Combined DateTime Card - Green theme
        datetimeCard: {
            background: 'linear-gradient(135deg, rgba(19, 136, 8, 0.1) 0%, rgba(19, 136, 8, 0.2) 100%)',
            border: '2px solid rgba(19, 136, 8, 0.3)',
            gridColumn: 'span 2',
        },
        datetimeText: {
            color: '#138808',
            fontSize: '2.5rem',
            fontWeight: '700',
            textAlign: 'center',
        },
        // Additional Info Cards
        infoCard: {
            background: 'linear-gradient(135deg, rgba(155, 89, 182, 0.1) 0%, rgba(142, 68, 173, 0.2) 100%)',
            border: '2px solid rgba(155, 89, 182, 0.3)',
        },
        infoText: {
            color: '#8e44ad',
            fontSize: '1.8rem',
            fontWeight: '600',
            textAlign: 'center',
        },
        festivalCard: {
            background: 'linear-gradient(135deg, rgba(241, 196, 15, 0.1) 0%, rgba(243, 156, 18, 0.2) 100%)',
            border: '2px solid rgba(241, 196, 15, 0.3)',
        },
        festivalList: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },
        festivalItem: {
            padding: '0.75rem',
            marginBottom: '0.5rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        },
        controlsContainer: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '2rem',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
            maxWidth: '1200px',
            margin: '2rem auto',
        },
        buttonGroup: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            marginBottom: '2rem',
        },
        button: {
            padding: '1rem 2.5rem',
            borderRadius: '15px',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            minWidth: '220px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        },
        refreshButton: {
            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
            color: 'white',
        },
        refreshButtonHover: {
            background: 'linear-gradient(135deg, #2980b9 0%, #1f639b 100%)',
            transform: 'scale(1.05)',
        },
        autoRefreshButton: {
            background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
            color: 'white',
        },
        autoRefreshButtonHover: {
            background: 'linear-gradient(135deg, #27ae60 0%, #219653 100%)',
            transform: 'scale(1.05)',
        },
        stopRefreshButton: {
            background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
            color: 'white',
        },
        stopRefreshButtonHover: {
            background: 'linear-gradient(135deg, #c0392b 0%, #a93226 100%)',
            transform: 'scale(1.05)',
        },
        settingsButton: {
            background: 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)',
            color: 'white',
        },
        settingsButtonHover: {
            background: 'linear-gradient(135deg, #8e44ad 0%, #7d3c98 100%)',
            transform: 'scale(1.05)',
        },
        disabledButton: {
            opacity: 0.6,
            cursor: 'not-allowed',
        },
        settingsPanel: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '15px',
            padding: '2rem',
            marginTop: '2rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        },
        settingOption: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1rem',
        },
        radioGroup: {
            display: 'flex',
            gap: '2rem',
            marginTop: '0.5rem',
        },
        radioLabel: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
        },
        statusContainer: {
            textAlign: 'center',
            padding: '1.5rem',
            borderRadius: '15px',
            marginTop: '1rem',
        },
        errorStatus: {
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            color: '#c0392b',
            border: '2px solid rgba(231, 76, 60, 0.3)',
        },
        successStatus: {
            backgroundColor: 'rgba(46, 204, 113, 0.1)',
            color: '#27ae60',
            border: '2px solid rgba(46, 204, 113, 0.3)',
        },
        footer: {
            textAlign: 'center',
            color: '#4a5568',
            fontSize: '1rem',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
        },
        loadingAnimation: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            height: '100px',
        },
        loadingDot: {
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: '#FF9933',
            animation: 'bounce 1.4s infinite ease-in-out both',
        },
    };

    // Sample Indian festivals data (in a real app, this would come from an API)
    const indianFestivals = [
        { name: "Republic Day", date: "January 26", emoji: "🇮🇳" },
        { name: "Holi", date: "March", emoji: "🎨" },
        { name: "Diwali", date: "October/November", emoji: "🪔" },
        { name: "Christmas", date: "December 25", emoji: "🎄" },
    ];

    // Indian time formatting functions
    const formatIndianDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatIndianTime = (timeStr, format = '24') => {
        if (!timeStr) return '';
        const [hours, minutes, seconds] = timeStr.split(':').map(Number);
        
        if (format === '12') {
            const period = hours >= 12 ? 'PM' : 'AM';
            const twelveHour = hours % 12 || 12;
            return `${twelveHour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
        }
        return timeStr;
    };

    const getIndianDayInfo = () => {
        const now = new Date();
        const day = now.getDay();
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        const indianDayNames = {
            'Sunday': 'रविवार',
            'Monday': 'सोमवार',
            'Tuesday': 'मंगलवार',
            'Wednesday': 'बुधवार',
            'Thursday': 'गुरुवार',
            'Friday': 'शुक्रवार',
            'Saturday': 'शनिवार'
        };

        return {
            english: days[day],
            hindi: indianDayNames[days[day]] || days[day],
            isWeekend: day === 0 || day === 6
        };
    };

    // Fetch current date and time from API
    const fetchDateTime = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/current-datetime');
            
            // Format data for Indian context
            const formattedDate = formatIndianDate(response.data.date);
            const formattedTime = formatIndianTime(response.data.time, timeFormat);
            const dayInfo = getIndianDayInfo();
            
            setCurrentDateTime({
                ...response.data,
                indian_date: formattedDate,
                indian_time: formattedTime,
                day_info: dayInfo,
                festivals: indianFestivals
            });
            setError(null);
        } catch (err) {
            setError('Failed to fetch date and time. Please try again.');
            console.error(err);
            
            // Fallback to client-side Indian time
            const now = new Date();
            const indianTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
            const [datePart, timePart] = indianTime.split(', ');
            
            setCurrentDateTime({
                date: datePart,
                time: timePart,
                datetime: indianTime,
                timezone: 'Asia/Kolkata',
                timestamp: Math.floor(now.getTime() / 1000),
                indian_date: formatIndianDate(datePart),
                indian_time: formatIndianTime(timePart.split(' ')[0], timeFormat),
                day_info: getIndianDayInfo(),
                festivals: indianFestivals
            });
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchDateTime();
    }, []);

    // Auto-refresh every second if enabled
    useEffect(() => {
        let interval;
        if (autoRefresh) {
            interval = setInterval(() => {
                fetchDateTime();
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [autoRefresh, timeFormat]);

    // Update time when format changes
    useEffect(() => {
        if (currentDateTime.time) {
            const formattedTime = formatIndianTime(currentDateTime.time, timeFormat);
            setCurrentDateTime(prev => ({
                ...prev,
                indian_time: formattedTime
            }));
        }
    }, [timeFormat]);

    // Loading animation component
    const LoadingAnimation = () => (
        <div style={styles.loadingAnimation}>
            <div style={{ ...styles.loadingDot, animationDelay: '-0.32s' }}></div>
            <div style={{ ...styles.loadingDot, animationDelay: '-0.16s' }}></div>
            <div style={styles.loadingDot}></div>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* Header with Indian Flag */}
            <div style={styles.header}>
                <h1 style={styles.title}>🕉️ Indian Standard Time (IST)</h1>
                <p style={styles.subtitle}>भारतीय मानक समय 🇮🇳</p>
                <div style={styles.flagContainer}>
                    <div style={{ ...styles.flagColor, ...styles.saffron }}></div>
                    <div style={{ ...styles.flagColor, ...styles.white }}>
                        <span style={styles.ashokaChakra}>☸</span>
                    </div>
                    <div style={{ ...styles.flagColor, ...styles.green }}></div>
                </div>
            </div>

            {/* Main DateTime Cards */}
            <div style={styles.mainCardContainer}>
                {/* Indian Date Card */}
                <div 
                    style={{ 
                        ...styles.card, 
                        ...styles.dateCard,
                        ...(loading ? {} : styles.cardHover)
                    }}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = styles.cardHover.transform)}
                    onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'none')}
                >
                    <div style={styles.cardHeader}>
                        📅 Indian Date Format
                    </div>
                    <div style={styles.dateText}>
                        {loading ? <LoadingAnimation /> : currentDateTime.date}
                    </div>
                    <div style={styles.indianDate}>
                        {loading ? '' : currentDateTime.indian_date}
                    </div>
                </div>

                {/* Indian Time Card */}
                <div 
                    style={{ 
                        ...styles.card, 
                        ...styles.timeCard,
                        ...(loading ? {} : styles.cardHover)
                    }}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = styles.cardHover.transform)}
                    onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'none')}
                >
                    <div style={styles.cardHeader}>
                        🕐 Indian Standard Time
                    </div>
                    <div style={styles.timeText}>
                        {loading ? <LoadingAnimation /> : currentDateTime.indian_time}
                        {!loading && timeFormat === '12' && (
                            <span style={styles.timePeriod}>
                                {parseInt(currentDateTime.time.split(':')[0]) >= 12 ? 'PM' : 'AM'}
                            </span>
                        )}
                    </div>
                </div>

                {/* Combined DateTime Card */}
                <div 
                    style={{ 
                        ...styles.card, 
                        ...styles.datetimeCard,
                        ...(loading ? {} : styles.cardHover)
                    }}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = styles.cardHover.transform)}
                    onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'none')}
                >
                    <div style={styles.cardHeader}>
                        📅🕐 Full Date & Time
                    </div>
                    <div style={styles.datetimeText}>
                        {loading ? <LoadingAnimation /> : currentDateTime.datetime}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '1rem', color: '#666' }}>
                        Timezone: {currentDateTime.timezone} (GMT+5:30)
                    </div>
                </div>

                {/* Day Information Card */}
                <div 
                    style={{ 
                        ...styles.card, 
                        ...styles.infoCard,
                        ...(loading ? {} : styles.cardHover)
                    }}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = styles.cardHover.transform)}
                    onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'none')}
                >
                    <div style={styles.cardHeader}>
                        📖 Day Information
                    </div>
                    <div style={styles.infoText}>
                        {loading ? <LoadingAnimation /> : (
                            <>
                                <div>{currentDateTime.day_info.english}</div>
                                <div style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>
                                    {currentDateTime.day_info.hindi}
                                </div>
                                <div style={{ 
                                    fontSize: '1rem', 
                                    marginTop: '1rem',
                                    color: currentDateTime.day_info.isWeekend ? '#e74c3c' : '#27ae60'
                                }}>
                                    {currentDateTime.day_info.isWeekend ? '🎉 Weekend!' : '💼 Working Day'}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Indian Festivals Card */}
                <div 
                    style={{ 
                        ...styles.card, 
                        ...styles.festivalCard,
                        ...(loading ? {} : styles.cardHover)
                    }}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = styles.cardHover.transform)}
                    onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'none')}
                >
                    <div style={styles.cardHeader}>
                        🎉 Upcoming Indian Festivals
                    </div>
                    <ul style={styles.festivalList}>
                        {indianFestivals.map((festival, index) => (
                            <li key={index} style={styles.festivalItem}>
                                <span style={{ fontSize: '1.5rem' }}>{festival.emoji}</span>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{festival.name}</div>
                                    <div style={{ fontSize: '0.9rem', color: '#666' }}>{festival.date}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Controls Section */}
            <div style={styles.controlsContainer}>
                <div style={styles.buttonGroup}>
                    <button
                        onClick={fetchDateTime}
                        disabled={loading}
                        style={{
                            ...styles.button,
                            ...styles.refreshButton,
                            ...(loading ? styles.disabledButton : {}),
                        }}
                        onMouseOver={(e) => !loading && (e.currentTarget.style.background = styles.refreshButtonHover.background)}
                        onMouseOut={(e) => !loading && (e.currentTarget.style.background = styles.refreshButton.background)}
                    >
                        🔄 {loading ? 'Refreshing...' : 'Refresh Time'}
                    </button>

                    <button
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        style={{
                            ...styles.button,
                            ...(autoRefresh ? styles.stopRefreshButton : styles.autoRefreshButton),
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 
                            (autoRefresh ? styles.stopRefreshButtonHover.background : styles.autoRefreshButtonHover.background)}
                        onMouseOut={(e) => e.currentTarget.style.background = 
                            (autoRefresh ? styles.stopRefreshButton.background : styles.autoRefreshButton.background)}
                    >
                        {autoRefresh ? '⏹️ Stop Auto Refresh' : '⚡ Start Auto Refresh'}
                    </button>

                    <button
                        onClick={() => setTimeFormat(timeFormat === '24' ? '12' : '24')}
                        style={{
                            ...styles.button,
                            ...styles.settingsButton,
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = styles.settingsButtonHover.background}
                        onMouseOut={(e) => e.currentTarget.style.background = styles.settingsButton.background}
                    >
                        {timeFormat === '24' ? '🕐 Switch to 12-hour' : '🕛 Switch to 24-hour'}
                    </button>
                </div>

                {/* Settings Panel */}
                <div style={styles.settingsPanel}>
                    <h3 style={{ marginBottom: '1rem', color: '#2d3748' }}>Settings</h3>
                    
                    <div style={styles.settingOption}>
                        <strong>Time Format:</strong>
                        <div style={styles.radioGroup}>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="12"
                                    checked={timeFormat === '12'}
                                    onChange={(e) => setTimeFormat(e.target.value)}
                                />
                                12-hour (AM/PM)
                            </label>
                            <label style={styles.radioLabel}>
                                <input
                                    type="radio"
                                    value="24"
                                    checked={timeFormat === '24'}
                                    onChange={(e) => setTimeFormat(e.target.value)}
                                />
                                24-hour Format
                            </label>
                        </div>
                    </div>
                </div>

                {/* Status Messages */}
                <div style={styles.statusContainer}>
                    {error && (
                        <div style={{ ...styles.statusContainer, ...styles.errorStatus }}>
                            ⚠️ {error}
                        </div>
                    )}
                    {autoRefresh && !error && (
                        <div style={{ ...styles.statusContainer, ...styles.successStatus }}>
                            ✅ Auto-refresh enabled - Updating every second
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <p style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '1rem' }}>
                    🇮🇳 Indian Standard Time Information
                </p>
                <p>
                    Indian Standard Time (IST) is the time zone observed throughout India, with a time offset of UTC+5:30.
                    India does not observe daylight saving time or other seasonal adjustments.
                </p>
                <div style={{ 
                    marginTop: '1rem', 
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 153, 51, 0.1)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 153, 51, 0.3)'
                }}>
                    <strong>Current Timezone:</strong> {currentDateTime.timezone} (GMT+5:30)
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#718096' }}>
                    Data fetched from server API: <code>/api/current-datetime</code>
                </p>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes bounce {
                    0%, 80%, 100% { 
                        transform: scale(0);
                    } 
                    40% { 
                        transform: scale(1.0);
                    }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                button:active {
                    transform: scale(0.98) !important;
                }
                
                input[type="radio"] {
                    accent-color: #8e44ad;
                }
                
                /* Card animations */
                .card {
                    animation: fadeIn 0.6s ease-out;
                }
                
                /* Responsive Design */
                @media (max-width: 1200px) {
                    .datetimeCard {
                        grid-column: span 1;
                    }
                }
                
                @media (max-width: 768px) {
                    .container {
                        padding: 1rem;
                    }
                    
                    .title {
                        font-size: 2rem;
                    }
                    
                    .mainCardContainer {
                        grid-template-columns: 1fr;
                    }
                    
                    .button {
                        min-width: 100%;
                    }
                    
                    .buttonGroup {
                        flex-direction: column;
                    }
                    
                    .dateText, .timeText {
                        font-size: 2.5rem;
                    }
                    
                    .datetimeText {
                        font-size: 1.8rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default DateTimeDisplay;