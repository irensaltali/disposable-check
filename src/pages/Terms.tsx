import { Layout } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AttributionPopup } from "@/components/AttributionPopup";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
    return (
        <Layout>
            <section className="py-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
                        <p className="text-muted-foreground">
                            Last updated: January 26, 2026
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Acceptance of Terms */}
                        <Card>
                            <CardHeader>
                                <CardTitle>1. Acceptance of Terms</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
                                <p>
                                    By accessing or using the DisposableCheck API and services ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Service.
                                </p>
                                <p>
                                    We reserve the right to modify these Terms at any time. Continued use of the Service after any changes constitutes your acceptance of the new Terms.
                                </p>
                            </CardContent>
                        </Card>

                        {/* API Usage */}
                        <Card>
                            <CardHeader>
                                <CardTitle>2. API Usage</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
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
                        <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    3. Attribution Requirements (Free Tier)
                                    <AttributionPopup />
                                </CardTitle>
                                <CardDescription>
                                    Required for all free tier API users
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
                                <p>
                                    Free tier API access requires visible attribution in the form of a backlink to one of our designated domains. Attribution must be:
                                </p>
                                <ul className="list-disc list-inside space-y-1 ml-2">
                                    <li>Publicly visible on your website or application</li>
                                    <li>A dofollow link (rel="nofollow" is not permitted)</li>
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
                        <Card className="border-red-200 dark:border-red-900">
                            <CardHeader>
                                <CardTitle>4. Limitation of Liability & Disclaimer</CardTitle>
                                <CardDescription>
                                    Important legal disclaimers
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
                                <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-lg p-4">
                                    <p className="font-medium text-red-800 dark:text-red-200 mb-2">
                                        DISCLAIMER OF WARRANTIES
                                    </p>
                                    <p className="text-red-700 dark:text-red-300">
                                        THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
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

                                <div className="bg-muted/50 rounded-lg p-4 mt-4">
                                    <p className="font-medium text-foreground mb-2">
                                        LIMITATION OF LIABILITY
                                    </p>
                                    <p>
                                        IN NO EVENT SHALL DISPOSABLECHECK, ITS OWNERS, OPERATORS, AFFILIATES, OR LICENSORS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                                    </p>
                                    <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
                                        <li>Your use or inability to use the Service</li>
                                        <li>Any unauthorized access to or alteration of your data</li>
                                        <li>False positives or false negatives in email detection</li>
                                        <li>Any third-party conduct or content</li>
                                        <li>Any other matter relating to the Service</li>
                                    </ul>
                                </div>

                                <p className="pt-2">
                                    Our total liability for any claims arising from or related to the Service shall not exceed the amount you paid us (if any) in the twelve (12) months preceding the claim.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Indemnification */}
                        <Card>
                            <CardHeader>
                                <CardTitle>5. Indemnification</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
                                <p>
                                    You agree to indemnify, defend, and hold harmless DisposableCheck and its owners, operators, affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or in any way connected with:
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
                            <CardHeader>
                                <CardTitle>6. Data & Privacy</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
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
                            <CardHeader>
                                <CardTitle>7. Termination</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
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
                            <CardHeader>
                                <CardTitle>8. Governing Law</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground space-y-3">
                                <p>
                                    These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising from these Terms or the Service shall be resolved through binding arbitration.
                                </p>
                            </CardContent>
                        </Card>

                        {/* Contact */}
                        <Card>
                            <CardHeader>
                                <CardTitle>9. Contact</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm text-muted-foreground">
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
