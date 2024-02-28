package Tokenizer;

public class LexicalError extends RuntimeException {
    public LexicalError(String message) {
        super(message);
    }
}
