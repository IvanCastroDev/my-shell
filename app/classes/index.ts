export class directory {
    private dir: string;

    constructor() {
        this.dir = process.cwd()
    };

    setDirectory(dir: string) {
        this.dir = dir;
    };

    getDirectory() {
      return this.dir;  
    };
}