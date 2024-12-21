export class CommandHistory {
  private history: string[] = [];
  private currentIndex: number = -1;

  add(command: string) {
    this.history.push(command);
    this.currentIndex = this.history.length;
  }

  getPrevious(): string | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  getNext(): string | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }

  reset() {
    this.currentIndex = this.history.length;
  }
}