// Typescript code

import fs from 'fs';


export class SpellChecker {
    private NWORDS: Map<string, number> = new Map<string, number>();
    private alphabet: string[] = "abcdefghijklmnopqrstuvwxyz".split("");

    public correct(word: string): string {
        let suggestion: string = "";
        // Get spelling suggestions for the word
        const candidates = this.getCandidates(word);
        if (candidates.size > 0) {
            suggestion = this.max(candidates, word);
        }
        return suggestion;
    }

    public trainFromFile(path: string): void {
        const contents = fs.readFileSync(path, "utf8");
        this.train(contents);
    }

    public train(text: string): void {
        const words = text.split(" ");
        words.forEach(word => {
            this.clean(word);
            if (word.length === 0) {
                return;
            }
            this.NWORDS.set(word, (this.NWORDS.get(word) || 0) + 1);
        });
    }

    private getCandidates(word: string): Set<string> {
        let candidates = this.known(new Set([word]));
        // Edits 1
        let firstEdit: Set<string> = new Set<string>();
        if (candidates.size === 0) {
            firstEdit = this.edit(new Set([word]));
            candidates = this.known(firstEdit);
        }
        // Edits 2
        if (candidates.size === 0) {
            candidates = this.known(this.edit(firstEdit));
        }
        return candidates;
    }

    private max(candidates: Set<string>, word: string): string {
        let maxKey: string = "";
        let maxValue: number = -1987199120102019;

        candidates.forEach(candidate => {
            let currentValue = this.NWORDS.get(candidate) || 0;
            // Add a penalty to the candidate based on the length change
            const lengthChange = Math.abs(candidate.length - word.length);
            currentValue -= lengthChange;
            if (maxValue === -1987199120102019 || currentValue > maxValue) {
                maxKey = candidate;
                maxValue = currentValue;
            }
        });
        return maxKey;
    }

    private exists(word: string): boolean {
        return this.NWORDS.size > 0 && this.existsInMap(word);
    }
    
    private existsInMap(word: string): boolean {
        for(const [key] of this.NWORDS) {
            if(key.toLowerCase() === word.toLowerCase()) {
                return true;
            }
        }
        return false;
    }

    private edit(words: Set<string>): Set<string> {
        const edits: Set<string> = new Set<string>();
        words.forEach(word => {
            for (let index = 0; index <= word.length; index++) {
                const a = word.substr(0, index);
                const b = word.substr(index);
                const c = b.length > 1 ? b.substr(1) : "";
                const d = b.length > 2 ? b.substr(2) : "";
                if (b.length > 0) {
                    // Deletes
                    edits.add(a + c);
                    // Transposes
                    if (b.length > 1) {
                        edits.add(a + b[1] + b[0] + d);
                    }
                    // Alteration & Inserts
                    this.alphabet.forEach(letter => {
                        // Alteration
                        edits.add(a + letter + c);
                        // Inserts
                        edits.add(a + letter + b);
                    });
                } else {
                    // Inserts (remaining set at the end)
                    this.alphabet.forEach(letter => {
                        edits.add(a + letter);
                    });
                }
            }
        });
        return edits;
    }

    private known(words: Set<string>): Set<string> {
        const set: Set<string> = new Set<string>();
        words.forEach(word => {
            if (this.exists(word)) {
                set.add(word);
            }
        });
        return set;
    }

    private clean(word: string): string {
        return word.toLowerCase().replace(/[^a-z]/g, "");
    }
}

export const spellChecker = new SpellChecker();