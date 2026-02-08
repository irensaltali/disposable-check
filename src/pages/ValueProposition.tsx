import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler,
    TooltipItem
} from 'chart.js';
import { Doughnut, Radar, Bar } from 'react-chartjs-2';
import Plot from 'react-plotly.js';
import { Shield, TrendingDown, DollarSign, CheckCircle } from "lucide-react";

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Filler
);

const ValueProposition = () => {
    const { theme } = useTheme();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () => {
            if (theme === "dark") return true;
            if (theme === "light") return false;
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        };
        setIsDark(checkDark());
    }, [theme]);

    // Common Colors
    const primaryColor = isDark ? '#818CF8' : '#4F46E5'; // Indigo-400 / Indigo-600
    const secondaryColor = isDark ? '#A78BFA' : '#7C3AED'; // Violet-400 / Violet-600
    const accentColor = isDark ? '#EC4899' : '#DB2777'; // Pink-500 / Pink-600
    const cyanColor = isDark ? '#22D3EE' : '#0891B2'; // Cyan-400 / Cyan-600
    const dangerColor = isDark ? '#F87171' : '#EF4444'; // Red-400 / Red-500
    const successColor = isDark ? '#34D399' : '#10B981'; // Emerald-400 / Emerald-500
    const mutedColor = isDark ? '#A1A1AA' : '#6B7280'; // Zinc-400 / Gray-500

    const commonTooltipConfig = {
        callbacks: {
            title: function (tooltipItems: TooltipItem<any>[]) {
                const item = tooltipItems[0];
                const label = item.chart.data.labels?.[item.dataIndex];
                if (Array.isArray(label)) {
                    return label.join(' ');
                } else {
                    return label as string;
                }
            }
        }
    };

    const wrapLabel = (str: string, maxChars: number) => {
        if (str.length <= maxChars) return str;
        const words = str.split(' ');
        const lines = [];
        let currentLine = words[0];
        for (let i = 1; i < words.length; i++) {
            if ((currentLine + ' ' + words[i]).length <= maxChars) {
                currentLine += ' ' + words[i];
            } else {
                lines.push(currentLine);
                currentLine = words[i];
            }
        }
        lines.push(currentLine);
        return lines;
    };

    // Chart 1: Doughnut - Cost Impact
    const costImpactData = {
        labels: [
            wrapLabel('Valid Contacts (Value)', 16),
            wrapLabel('Disposable (Wasted Spend)', 16),
            wrapLabel('Hard Bounces (Risk)', 16),
            wrapLabel('Spam Traps (Danger)', 16)
        ],
        datasets: [{
            data: [60, 20, 15, 5],
            backgroundColor: [
                primaryColor,
                accentColor,
                '#FCD34D', // Yellow-300
                dangerColor
            ],
            borderWidth: 0,
            hoverOffset: 4
        }]
    };

    const costImpactOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: commonTooltipConfig,
            legend: {
                position: 'bottom' as const,
                labels: { color: isDark ? '#E4E4E7' : '#374151' }
            },
            title: {
                display: true,
                text: 'Database Composition without Verification',
                color: isDark ? '#E4E4E7' : '#374151',
                font: { size: 16 }
            }
        }
    };

    // Chart 2: Radar - Deep Verification vs Regex
    const radarLabels = [
        wrapLabel('Fraud Detection', 16),
        wrapLabel('Inbox Accuracy', 16),
        wrapLabel('Domain Reputation', 16),
        wrapLabel('Cost Efficiency', 16),
        wrapLabel('Setup Simplicity', 16)
    ];

    const radarData = {
        labels: radarLabels,
        datasets: [{
            label: 'Deep Verification',
            data: [95, 98, 90, 85, 75],
            fill: true,
            backgroundColor: isDark ? 'rgba(34, 211, 238, 0.2)' : 'rgba(8, 145, 178, 0.2)', // Cyan transparent
            borderColor: cyanColor,
            pointBackgroundColor: cyanColor
        }, {
            label: 'Basic Regex',
            data: [10, 40, 30, 95, 95],
            fill: true,
            backgroundColor: isDark ? 'rgba(236, 72, 153, 0.2)' : 'rgba(219, 39, 119, 0.2)', // Pink transparent
            borderColor: accentColor,
            pointBackgroundColor: accentColor
        }]
    };

    const radarOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                angleLines: { display: true, color: isDark ? '#52525B' : '#E5E7EB' },
                grid: { color: isDark ? '#52525B' : '#E5E7EB' },
                pointLabels: { color: isDark ? '#E4E4E7' : '#374151' },
                ticks: { display: false, backdropColor: 'transparent' },
                suggestedMin: 0,
                suggestedMax: 100
            }
        },
        plugins: {
            tooltip: commonTooltipConfig,
            legend: { labels: { color: isDark ? '#E4E4E7' : '#374151' } }
        }
    };

    // Chart 3: Bar - Operational Savings
    const barLabels = [
        wrapLabel('Monthly ESP Cost', 16),
        wrapLabel('Customer Support Time', 16),
        wrapLabel('Lost Revenue (Churn)', 16),
        wrapLabel('Fraud Management', 16)
    ];

    const roiData = {
        labels: barLabels,
        datasets: [{
            label: 'Without Verification',
            data: [1000, 800, 1200, 500],
            backgroundColor: dangerColor,
            borderRadius: 4
        },
        {
            label: 'With Disposable Checker',
            data: [750, 300, 800, 100],
            backgroundColor: successColor,
            borderRadius: 4
        }]
    };

    const roiOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: commonTooltipConfig,
            legend: {
                position: 'top' as const,
                labels: { color: isDark ? '#E4E4E7' : '#374151' }
            },
            title: {
                display: true,
                text: 'Monthly Operational Savings ($)',
                color: isDark ? '#E4E4E7' : '#374151'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: isDark ? '#52525B' : '#E5E7EB' },
                ticks: { color: isDark ? '#A1A1AA' : '#6B7280' }
            },
            x: {
                grid: { display: false },
                ticks: { color: isDark ? '#A1A1AA' : '#6B7280' }
            }
        }
    };

    // Chart 4: 3D Scatter with Plotly
    // Generate data once
    const [plotlyData, setPlotlyData] = useState<any[]>([]);

    useEffect(() => {
        const count = 80;
        const xData = [];
        const yData = [];
        const zData = [];
        const colors = [];

        for (let i = 0; i < count; i++) {
            let fraudBlock = Math.random() * 100;
            let domainHealth = (fraudBlock * 0.7) + (Math.random() * 30);
            let roi = (domainHealth * 0.8) + (Math.random() * 20);

            xData.push(fraudBlock);
            yData.push(domainHealth);
            zData.push(roi);
            colors.push(roi);
        }

        const trace3d = {
            x: xData,
            y: yData,
            z: zData,
            mode: 'markers',
            marker: {
                size: 6,
                color: colors,
                colorscale: 'Portland', // Or Viridis, ensuring good contrast
                opacity: 0.9
            },
            type: 'scatter3d',
            hovertemplate: 'Fraud Blocked: %{x:.1f}%<br>Domain Health: %{y:.1f}<br>ROI: %{z:.1f}<extra></extra>'
        };
        setPlotlyData([trace3d]);
    }, []);

    const plotlyLayout = {
        margin: { l: 0, r: 0, b: 0, t: 0 },
        scene: {
            xaxis: { title: 'Fraud Blocked %', color: isDark ? '#A1A1AA' : '#4B5563' },
            yaxis: { title: 'Domain Health', color: isDark ? '#A1A1AA' : '#4B5563' },
            zaxis: { title: 'Marketing ROI', color: isDark ? '#A1A1AA' : '#4B5563' },
            bgcolor: 'transparent'
        },
        paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        height: 500,
        font: { color: isDark ? '#A1A1AA' : '#4B5563' }
    };

    return (
        <Layout>
            {/* Header */}
            {/* Header / Hero - Updated to use amber gradient */}
            <header className="bg-primary-gradient dark:bg-primary-gradient-dark text-white py-12 sm:py-16 lg:py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        Value Proposition
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight">
                        The <span className="underline decoration-white/30 underline-offset-8">Disposable Email Checker</span> Advantage
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed px-4">
                        Elevating email security and ROI through Deep Verification (MX & SMTP) and real-time fraud prevention.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <span className="bg-white text-indigo-700 px-6 py-2 rounded-full font-bold shadow-md">Deep Verification</span>
                        <span className="bg-white text-pink-600 px-6 py-2 rounded-full font-bold shadow-md">Fraud Protection</span>
                        <span className="bg-white text-cyan-700 px-6 py-2 rounded-full font-bold shadow-md">Cost Efficiency</span>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Section 1 */}
                <section className="md:col-span-2 bg-card rounded-xl shadow-md p-8 border-l-8 border-pink-500">
                    <h2 className="text-3xl font-bold text-foreground mb-4">1. The Cost of False Users</h2>
                    <p className="text-muted-foreground text-lg mb-6">
                        Disposable emails are the primary tool for <strong>freemium abuse</strong>, credit card fraud, and marketing database inflation. A robust Disposable Email Checker identifies these temporary inboxes instantly, protecting your bottom line.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="relative w-full h-[350px] max-h-[400px]">
                            <Doughnut data={costImpactData} options={costImpactOptions} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-primary mb-4">ROI Drainers</h3>
                            <ul className="space-y-4 text-foreground">
                                <li className="flex items-start">
                                    <DollarSign className="w-6 h-6 mr-3 text-muted-foreground shrink-0" />
                                    <div>
                                        <strong>Marketing Waste:</strong>
                                        <p className="text-sm text-muted-foreground">You pay your ESP (Email Service Provider) per contact. Storing 20% disposable emails means 20% wasted budget.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <Shield className="w-6 h-6 mr-3 text-muted-foreground shrink-0" />
                                    <div>
                                        <strong>Platform Abuse:</strong>
                                        <p className="text-sm text-muted-foreground">Users creating multiple accounts with temp mails to exploit free trials or bypass bans.</p>
                                    </div>
                                </li>
                                <li className="flex items-start">
                                    <TrendingDown className="w-6 h-6 mr-3 text-muted-foreground shrink-0" />
                                    <div>
                                        <strong>Sender Score:</strong>
                                        <p className="text-sm text-muted-foreground">High bounce rates from expired temp emails trigger spam filters for your valid users.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Section 2 */}
                <section className="bg-card rounded-xl shadow-md p-6 border-t-4 border-indigo-500">
                    <h2 className="text-2xl font-bold text-foreground mb-4">2. Deep Verification vs. Regex</h2>
                    <p className="text-muted-foreground mb-6">
                        Standard regex checks only look for "@" symbols. <strong>Deep Verification</strong> goes layers deeper, validating the domain's ability to receive mail and the specific user's existence.
                    </p>
                    <div className="relative w-full h-[350px]">
                        <Radar data={radarData} options={radarOptions} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-4 italic text-center">
                        Comparison: Basic Syntax Check vs. Deep Verification.
                    </p>
                </section>

                {/* Section 3 */}
                <section className="bg-card rounded-xl shadow-md p-6 border-t-4 border-cyan-500">
                    <h2 className="text-2xl font-bold text-foreground mb-4">3. How Deep Verification Works</h2>
                    <p className="text-muted-foreground mb-6">
                        It initiates a real-time negotiation with the target mail server. This "Handshake" confirms validity without ever sending a nuisance email to the user.
                    </p>

                    <div className="flex flex-col space-y-4 items-center justify-center p-4 bg-muted/30 rounded-lg">
                        <div className="w-full max-w-sm bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-500 rounded-lg p-3 text-center shadow-sm">
                            <div className="font-bold text-indigo-800 dark:text-indigo-300">1. Syntax & Formatting</div>
                            <div className="text-xs text-indigo-600 dark:text-indigo-400">RFC Compliance Check</div>
                        </div>

                        <div className="text-xl text-muted-foreground">⬇️</div>

                        <div className="w-full max-w-sm bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500 rounded-lg p-3 text-center shadow-sm">
                            <div className="font-bold text-purple-800 dark:text-purple-300">2. MX Record Lookup</div>
                            <div className="text-xs text-purple-600 dark:text-purple-400">Locate Mail Server (DNS)</div>
                        </div>

                        <div className="text-xl text-muted-foreground">⬇️</div>

                        <div className="w-full max-w-sm bg-pink-100 dark:bg-pink-900/30 border-2 border-pink-500 rounded-lg p-3 text-center shadow-sm">
                            <div className="font-bold text-pink-800 dark:text-pink-300">3. Disposable Filter</div>
                            <div className="text-xs text-pink-600 dark:text-pink-400">Cross-reference 50k+ temp domains</div>
                        </div>

                        <div className="text-xl text-muted-foreground">⬇️</div>

                        <div className="w-full max-w-sm bg-cyan-100 dark:bg-cyan-900/30 border-2 border-cyan-500 rounded-lg p-4 text-center shadow-sm relative">
                            <div className="font-bold text-cyan-800 dark:text-cyan-300">4. SMTP Handshake</div>
                            <div className="text-xs text-cyan-600 dark:text-cyan-400 mt-1">EHLO &gt; MAIL FROM &gt; RCPT TO</div>
                            <div className="absolute -right-2 top-1/2 -translate-y-1/2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md transform rotate-12">
                                Abort (RSET)
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2 text-center max-w-xs">
                            *The connection is closed immediately after the server confirms the recipient exists. No email is sent.
                        </div>
                    </div>
                </section>

                {/* Section 4 */}
                <section className="md:col-span-2 bg-card rounded-xl shadow-md p-8 border-l-8 border-green-500">
                    <h2 className="text-3xl font-bold text-foreground mb-4">4. Security & Business Impact</h2>
                    <p className="text-muted-foreground text-lg mb-6">
                        Implementing a Disposable Email Checker is a security upgrade. It acts as a firewall against fraudulent registrations and ensures that your communication budget is spent on real potential customers.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="relative w-full h-[350px]">
                            <Bar data={roiData} options={roiOptions} />
                        </div>
                        <div className="flex flex-col justify-center">
                            <h3 className="text-xl font-bold text-foreground mb-3">Tangible Benefits</h3>
                            <div className="space-y-4">
                                <div className="bg-muted/30 p-4 rounded border">
                                    <h4 className="font-bold text-primary flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Zero-Trust Registration
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">Prevent fake accounts at the gate. If the email doesn't handshake via SMTP, the account isn't created.</p>
                                </div>
                                <div className="bg-muted/30 p-4 rounded border">
                                    <h4 className="font-bold text-accentFn flex items-center gap-2" style={{ color: accentColor }}>
                                        <Shield className="w-4 h-4" /> Hard Bounce Prevention
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">Keep your bounce rate under 1%. Deep Verification catches "does not exist" errors before you hit "Send."</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 5 */}
                <section className="md:col-span-2 bg-card rounded-xl shadow-md p-8 border-b-8 border-purple-600">
                    <h2 className="text-3xl font-bold text-foreground mb-4">5. The Fraud-Reputation Nexus</h2>
                    <p className="text-muted-foreground text-lg mb-6">
                        There is a direct correlation between preventing disposable signups, reducing fraud, and maintaining high inbox placement.
                    </p>
                    <div className="w-full h-[500px] border rounded-lg shadow-inner bg-muted/10 relative">
                        {/* Plotly Chart */}
                        <Plot
                            data={plotlyData}
                            layout={plotlyLayout}
                            useResizeHandler
                            style={{ width: "100%", height: "100%" }}
                            config={{ displayModeBar: false }}
                        />
                    </div>
                    <p className="text-center text-sm text-muted-foreground mt-2">
                        Interactive Analysis: Rotate to explore relationship between Fraud Blocks, Domain Health, and ROI.
                    </p>
                </section>

            </main>
        </Layout>
    );
};

export default ValueProposition;
