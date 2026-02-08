import { useState } from "react";
import { ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const attributionDomains = [
    { name: "irensaltali.com", url: "https://irensaltali.com", description: "Personal website & portfolio" },
    { name: "sendfax.pro", url: "https://sendfax.pro", description: "Professional fax service" },
    { name: "zenrise.app", url: "https://zenrise.app", description: "Wellness & productivity app" },
];

interface AttributionPopupProps {
    trigger?: React.ReactNode;
}

export function AttributionPopup({ trigger }: AttributionPopupProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="link" className="h-auto p-0 text-primary font-medium text-xs sm:text-sm">
                        <Info className="mr-1 h-3 w-3" />
                        Attribution Required
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md w-[calc(100%-2rem)] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                        <span className="text-lg sm:text-xl">📋</span> Attribution Requirements
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">
                        Free tier API usage requires a visible backlink to one of our partner sites.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <h4 className="font-medium text-xs sm:text-sm">How to Attribute</h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            Add a visible link on your website or application footer, credits page, or API documentation. The link must be:
                        </p>
                        <ul className="text-xs sm:text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
                            <li>Publicly visible (not hidden or cloaked)</li>
                            <li>A dofollow link (no rel=&quot;nofollow&quot;)</li>
                            <li>Active for as long as you use the API</li>
                        </ul>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium text-xs sm:text-sm">Choose One Link</h4>
                        <div className="space-y-2">
                            {attributionDomains.map((domain) => (
                                <a
                                    key={domain.name}
                                    href={domain.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-2.5 sm:p-3 rounded-lg border bg-card hover:bg-accent transition-colors group"
                                >
                                    <div className="min-w-0">
                                        <p className="font-medium text-xs sm:text-sm group-hover:text-primary transition-colors truncate">
                                            {domain.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground truncate">{domain.description}</p>
                                    </div>
                                    <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t">
                        <h4 className="font-medium text-xs sm:text-sm">Example Attribution</h4>
                        <div className="bg-muted p-2.5 sm:p-3 rounded-md overflow-x-auto">
                            <code className="text-[10px] sm:text-xs whitespace-pre-wrap break-all">
                                {`<a href="https://irensaltali.com">Powered by DisposableCheck</a>`}
                            </code>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
