package Parser;

import Statement.Expr;
import Tokenizer.*;

public interface Parser {
    Expr parse() throws SyntaxError, LexicalError;
}