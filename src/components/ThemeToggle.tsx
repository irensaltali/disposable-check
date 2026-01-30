import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/ThemeProvider";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 sm:h-9 sm:w-9" 
                    aria-label="Toggle theme"
                >
                    <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" aria-hidden="true" />
                    <Moon className="absolute h-3.5 w-3.5 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className={theme === "light" ? "bg-accent" : ""}
                >
                    <Sun className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-sm">Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className={theme === "dark" ? "bg-accent" : ""}
                >
                    <Moon className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-sm">Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className={theme === "system" ? "bg-accent" : ""}
                >
                    <Monitor className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="text-sm">System</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
