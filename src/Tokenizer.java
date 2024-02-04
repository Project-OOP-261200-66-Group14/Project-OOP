public interface Tokenizer {
    /** Returns true if there is
     *  more token */
    boolean hasNextToken();
    /**
     * Returns the next token
     * in the input stream.
     */
    String peek() ;
    /**
     * Consumes the next token
     * from the input stream
     * and returns it.
     * effects: removes the next token
     * from the input stream
     */
    String consume() ;
    public boolean peek(String s) ;
    public void consume(String s) ;

}
