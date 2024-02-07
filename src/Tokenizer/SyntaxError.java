package Tokenizer;

public class SyntaxError extends RuntimeException {
    public SyntaxError(String message) {
        super(message);
    }
}