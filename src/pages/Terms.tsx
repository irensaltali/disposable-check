import { Layout } from "@/components/Layout";
import { SeoHead } from "@/components/SeoHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AttributionPopup } from "@/components/AttributionPopup";

const Terms = () => {
    return (
        <Layout>
            <SeoHead
                title="Disposable Email API Terms of Service | DisposableCheck"
                description="Read the DisposableCheck Terms of Service for API usage, attribution requirements, and legal terms."
            />
            <section className="section-spacing">
                <div className="container mx-auto container-responsive max-w-4xl">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Disposable Email API Terms of Service</h1>
                        <p className="text-muted-foreground text-sm sm:text-base">
                            Last updated: January 26, 2026
                        </p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {/* Acceptance of Terms */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">1. Acceptance of Terms</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    By accessing or using the DisposableCheck API and services (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, do not use our Service.
                                </p>
                                <p>
                                    We reserve the right to modify these Terms at any time. Continued use of the Service after any changes constitutes your acceptance of the new Terms.
                                </p>
                            </CardContent>
                        </Card>

                        {/* API Usage */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">2. API Usage</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    The DisposableCheck API is provided for the purpose of detecting disposable and temporary email addresses. You agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>Use the API only for lawful purposes</li>
                                    <li>Not exceed rate limits specified for your tier</li>
                                    <li>Not attempt to circumvent security measures or access controls</li>
                                    <li>Not redistribute, resell, or sublicense API access</li>
                                    <li>Not use the API to harass, abuse, or harm others</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Attribution Requirements */}
                        <Card className="border-primary/30 bg-amber-accent">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                                    3. Attribution Requirements (Free Tier)
                                    <AttributionPopup />
                                </CardTitle>
                                <CardDescription className="text-sm">
                                    Required for all free tier API users
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    Free tier API access requires visible attribution in the form of a backlink to one of our designated domains. Attribution must be:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>Publicly visible on your website or application</li>
                                    <li>A dofollow link (rel=&quot;nofollow&quot; is not permitted)</li>
                                    <li>Maintained for the duration of your API usage</li>
                                </ul>
                                <div className="pt-2">
                                    <p className="font-medium text-foreground mb-2">Approved Attribution Domains:</p>
                                    <ul className="list-disc list-inside space-y-1 ml-2">
                                        <li><a href="https://irensaltali.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">irensaltali.com</a></li>
                                        <li><a href="https://sendfax.pro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">sendfax.pro</a></li>
                                        <li><a href="https://zenrise.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">zenrise.app</a></li>
                                    </ul>
                                </div>
                                <p className="pt-2">
                                    Failure to provide proper attribution may result in API access revocation without notice.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Liability Waiver */}
                        <Card className="border-destructive/30">
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">4. Limitation of Liability & Disclaimer</CardTitle>
                                <CardDescription className="text-sm">
                                    Important legal disclaimers
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 sm:p-4">
                                    <p className="font-medium text-destructive mb-2 text-sm">
                                        DISCLAIMER OF WARRANTIES
                                    </p>
                                    <p className="text-destructive/90 text-xs sm:text-sm">
                                        THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                                    </p>
                                </div>

                                <p>
                                    DisposableCheck does not guarantee:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>100% accuracy in detecting disposable email domains</li>
                                    <li>Uninterrupted or error-free service availability</li>
                                    <li>That the service will meet your specific requirements</li>
                                    <li>The completeness or timeliness of our domain database</li>
                                </ul>

                                <div className="bg-muted/50 rounded-lg p-3 sm:p-4 mt-4">
                                    <p className="font-medium text-foreground mb-2 text-sm">
                                        LIMITATION OF LIABILITY
                                    </p>
                                    <p className="text-xs sm:text-sm">
                                        IN NO EVENT SHALL DISPOSABLECHECK, ITS OWNERS, OPERATORS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2 text-xs sm:text-sm">
                                        <li>Your use or inability to use the Service</li>
                                        <li>Any unauthorized access to or alteration of your data</li>
                                        <li>False positives or false negatives in email detection</li>
                                        <li>Any third-party conduct or content</li>
                                        <li>Any other matter relating to the Service</li>
                                    </ul>
                                </div>

                                <p className="pt-2 text-xs sm:text-sm">
                                    Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us (if any) in the twelve (12) months preceding the claim.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Indemnification */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">5. Indemnification</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    You agree to indemnify, defend, and hold harmless DisposableCheck and its owners, operators, affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising out of or in any way connected with:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>Your access to or use of the Service</li>
                                    <li>Your violation of these Terms</li>
                                    <li>Your violation of any third-party rights</li>
                                    <li>Any content you submit or transmit through the Service</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Data & Privacy */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">6. Data & Privacy</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    We collect minimal data necessary to provide the Service:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>API requests may be logged for rate limiting and abuse prevention</li>
                                    <li>Email addresses submitted for checking are not stored permanently</li>
                                    <li>We do not sell or share your data with third parties</li>
                                </ul>
                                <p className="pt-2">
                                    By using the Service, you consent to our data practices as described herein.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Termination */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">7. Termination</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    We reserve the right to suspend or terminate your access to the Service at any time, with or without cause, with or without notice. Upon termination:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>Your API keys will be revoked immediately</li>
                                    <li>You must cease all use of the Service</li>
                                    <li>Provisions that by their nature should survive termination shall survive</li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Governing Law */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">8. Governing Law</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3 p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card>
                            <CardHeader className="p-4 sm:p-6">
                                <CardTitle className="text-base sm:text-lg">9. Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground p-4 sm:p-6 pt-0 sm:pt-0">
                                <p>
                                    For questions about these Terms, please contact us at{" "}
                                    <a href="mailto:legal@disposablecheck.com" className="text-primary hover:underline">
                                        legal@disposablecheck.com
                                    </a>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Terms;
