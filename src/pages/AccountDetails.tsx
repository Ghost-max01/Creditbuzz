import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Building2, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ACCOUNT_DATA } from "@/lib/accountData";

export const AccountDetailsPage = () => {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [revealedAccounts, setRevealedAccounts] = useState<Set<string>>(new Set());

  const handleCopy = async (text: string, label: string, accountId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(`${accountId}-${label}`);
      toast({
        title: "Copied!",
        description: `${label} has been copied to clipboard`,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const toggleReveal = (accountId: string) => {
    const newSet = new Set(revealedAccounts);
    if (newSet.has(accountId)) {
      newSet.delete(accountId);
    } else {
      newSet.add(accountId);
    }
    setRevealedAccounts(newSet);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const getTypeColor = (type: "payment" | "withdrawal") => {
    return type === "payment" ? "from-blue-600 to-cyan-600" : "from-purple-600 to-pink-600";
  };

  const getTypeIcon = (type: "payment" | "withdrawal") => {
    return type === "payment" ? "💳" : "💸";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-border/5 bg-background/80 backdrop-blur-xl">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold">Account Details</h1>
            <p className="text-xs text-muted-foreground">All accounts in one place</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {ACCOUNT_DATA.map((account, index) => {
          const isRevealed = revealedAccounts.has(account.id);
          const isCopied = copiedField?.startsWith(account.id);

          return (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className={`bg-gradient-to-br ${getTypeColor(account.type)} rounded-2xl p-px overflow-hidden`}>
                <div className="bg-background rounded-2xl p-6 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{getTypeIcon(account.type)}</span>
                      <div>
                        <h3 className="font-semibold">
                          {account.type === "payment" ? "Payment Account" : "Withdrawal Account"}
                        </h3>
                        <p className="text-xs text-muted-foreground">{account.description}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        account.type === "payment"
                          ? "bg-blue-500/10 text-blue-600"
                          : "bg-purple-500/10 text-purple-600"
                      }`}
                    >
                      {account.type === "payment" ? "Incoming" : "Outgoing"}
                    </span>
                  </div>

                  {/* Amount */}
                  <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                    <p className="text-xs text-muted-foreground mb-1">Amount</p>
                    <p className="text-xl font-bold">{formatCurrency(account.amount)}</p>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-3">
                    {/* Bank Name */}
                    <div className="p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground">Bank Name</p>
                        <button
                          onClick={() => handleCopy(account.bankName, "Bank Name", account.id)}
                          className={`p-1 rounded transition-colors ${
                            isCopied ? "bg-green-500/10 text-green-600" : "hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      </div>
                      <p className="font-medium">{account.bankName}</p>
                    </div>

                    {/* Account Name */}
                    <div className="p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs text-muted-foreground">Account Name</p>
                        <button
                          onClick={() => handleCopy(account.accountName, "Account Name", account.id)}
                          className={`p-1 rounded transition-colors ${
                            isCopied ? "bg-green-500/10 text-green-600" : "hover:bg-muted text-muted-foreground"
                          }`}
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                          )}
                        </button>
                      </div>
                      <p className="font-medium">{account.accountName}</p>
                    </div>

                    {/* Account Number - Sensitive */}
                    <div className="p-3 rounded-lg border border-border/50 hover:border-border transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p className="text-xs text-muted-foreground">Account Number</p>
                          {!isRevealed && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600">
                              🔒 Sensitive
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleReveal(account.id)}
                            className="p-1 rounded hover:bg-muted text-muted-foreground transition-colors"
                            title={isRevealed ? "Hide" : "Show"}
                          >
                            {isRevealed ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleCopy(account.accountNumber, "Account Number", account.id)}
                            disabled={!isRevealed}
                            className={`p-1 rounded transition-colors ${
                              isCopied
                                ? "bg-green-500/10 text-green-600"
                                : isRevealed
                                  ? "hover:bg-muted text-muted-foreground"
                                  : "opacity-50 cursor-not-allowed"
                            }`}
                          >
                            {isCopied ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="font-mono font-semibold text-lg tracking-widest">
                        {isRevealed ? account.accountNumber : "••••••••••"}
                      </p>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <p className="text-xs text-muted-foreground">
                      ⓘ Click on any field to copy the information to your clipboard
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-4 rounded-lg bg-muted/50 border border-border/50"
        >
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Summary
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-muted-foreground">Total Accounts:</span>{" "}
              <span className="font-semibold">{ACCOUNT_DATA.length}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Payment Accounts:</span>{" "}
              <span className="font-semibold">{ACCOUNT_DATA.filter((a) => a.type === "payment").length}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Withdrawal Accounts:</span>{" "}
              <span className="font-semibold">{ACCOUNT_DATA.filter((a) => a.type === "withdrawal").length}</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountDetailsPage;
