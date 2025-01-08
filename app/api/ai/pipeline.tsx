import { pipeline } from '@huggingface/transformers';

class PipelineSingleton {
  // private static task = 'text-generation';
  // private static model = 'kodychik/Qwen2.5-0.5B-finetuned-stoic-mindset';
  static task = 'text-classification';
  static model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  private static instance: any = null;

  public static async getInstance(progressCallback?: (progress: number) => void) {
    if (!this.instance) {
      this.instance = await pipeline(this.task, this.model, { progressCallback });
    }
    return this.instance;
  }
}

export default PipelineSingleton;
