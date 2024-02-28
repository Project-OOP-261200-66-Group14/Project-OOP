package Parser;

import Statement.Expr;
import Tokenizer.*;

public interface ParserExpr {
    Expr parse() throws SyntaxError, LexicalError;
}