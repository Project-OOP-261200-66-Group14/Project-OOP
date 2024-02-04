public class ExprTokenizer implements Tokenizer {

    private final String src;
    private String next;
    private int pos;

    public ExprTokenizer(String src) {
        this.src = src;
        pos = 0;
        computeNext();
    }

    public boolean hasNextToken() {
        return next != null;
    }

    public boolean checkNextToken() {
        return hasNextToken();
    }

    public String peek() {
        checkNextToken();
        return next;
    }

    public String consume() {
        checkNextToken();
        String result = next;
        computeNext();
        return result;
    }

    private void computeNext() {
        StringBuilder s = new StringBuilder();
        while (pos < src.length() && Character.isWhitespace(src.charAt(pos)))
            pos++;  // ignore whitespace
        if (pos == src.length()) {
            next = "";  // Set next to an empty string when there are no more tokens
            return;
        }  // no more tokens
        char c = src.charAt(pos);
        if (Character.isDigit(c)) {  // start of number
            s.append(c);
            for (pos++; pos < src.length() && Character.isDigit(src.charAt(pos)); pos++)
                s.append(src.charAt(pos));
        } else if (Character.isLetter(c)) {  // start of string
            while (pos < src.length() && Character.isLetter(src.charAt(pos))) {
                s.append(src.charAt(pos));
                pos++;
            }
        } else if (c == '+' || c == '(' || c == ')' || c == '*' || c == '-' || c == '/' || c == '%') {
            s.append(c);
            pos++;
        } else {
            throw new LexicalError("unknown character: " + c);
        }
        next = s.toString();
    }

    public boolean peek(String s) {
        if (!hasNextToken()) return false;
        return next.equals(s);
    }

    public void consume(String s) throws SyntaxError {
        if (peek(s))
            consume();
        else
            throw new SyntaxError(s + " expected");
    }
}

class LexicalError extends RuntimeException {
    public LexicalError(String message) {
        super(message);
    }
}

class SyntaxError extends RuntimeException {
    public SyntaxError(String message) {
        super(message);
    }
}
